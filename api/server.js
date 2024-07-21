const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3000;

// Create app using express
const app = express();

// Let the express app use json type and cors
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/injury-tracker")
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

const Injury = require("./models/Tracker");
const User = require("./models/User");

// Get injuries
app.get("/injuries", async (req, res) => {
  const injuries = await Injury.find();

  res.json(injuries);
});

// Create a new injury
app.post("/injury/new", (req, res) => {
  const injury = new Injury({
    text: req.body.text,
    severity: req.body.severity,
    symptoms: req.body.symptoms,
  });

  injury.save();

  res.json(injury);
});

// Delete an injury
app.delete("/injury/delete/:id", async (req, res) => {
  try {
    const result = await Injury.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send("Injury not found");
    }
    res.json(result);
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(404).json({ error: "Injury not found" });
    }
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Complete an injury
app.get("/injury/complete/:id", async (req, res) => {
  const injury = await Injury.findById(req.params.id);
  console.log(injury);

  try {
    if (injury.complete === null) {
      return res.status(404).send("Injury not found");
    }
    injury.complete = !injury.complete;
    await injury.save();
  } catch (error) {
    console.error(error);
  }

  res.json(injury);
});

// Fetch the Completed Injuries
app.get("/injury/completed", async (req, res) => {
  try {
    const completedInjuries = await Injury.find({ complete: true });
    res.json(completedInjuries);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update the Injury
app.put("/injury/update/:id", async (req, res) => {
  const { severity, symptoms, time } = req.body;

  try {
    const injury = await Injury.findById(req.params.id);

    if (!injury) {
      return res.status(404).send("Injury not found");
    }

    injury.history.push({
      severity: injury.severity,
      symptoms: injury.symptoms,
      time: injury.time,
    });

    injury.severity = severity;
    injury.symptoms = symptoms;
    injury.time = time;

    await injury.save();

    res.json(injury);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Non Completed Injuries
app.get("/injury/notcompleted", async (req, res) => {
  try {
    const nonCompletedInjuries = await Injury.find({ complete: false });
    res.json(nonCompletedInjuries);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/register/submit", async (req, res) => {
  try {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        res.json("Email already has an account");
      } else {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error " });
  }

  res.json("Account Created");
});

// CREATE A REQUEST TO FETCH AN INJURY FROM AN ID
/*************************** */

app.listen(port, () => console.log("Server started on port 3000"));
