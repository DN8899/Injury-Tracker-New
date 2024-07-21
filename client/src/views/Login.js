import React from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doCreateUserWithEmailAndPassword,
} from "../firebase/auth";

function Login() {
  return (
    <div className="login">
      <h1>Login</h1>
    </div>
  );
}
