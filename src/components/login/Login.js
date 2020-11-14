import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "../../firebase/Firebase";
import { CircularProgress } from "@material-ui/core";
function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [operation, setOperation] = useState("");
  const login = (event) => {
    event.preventDefault();
    setProcessing(true);
    setOperation("login");
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        //loggedIn redirect
        setProcessing(false);
        history.push("/");
      })
      .catch((e) => {
        setProcessing(false);
        alert(e.message);
      });
  };
  const register = (event) => {
    event.preventDefault();
    setProcessing(true);
    setOperation("register");
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // user created & loggedIn redirect
        setProcessing(false);
        history.push("/");
      })
      .catch((e) => {
        setProcessing(false);
        alert(e.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png"
          alt="logo"
          className="login__logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login_signInButton" type="submit" onClick={login}>
            {processing && operation === "login" ? (
              <CircularProgress size="20px" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <hr />
        <span>New to Amazon?</span>
        <button
          className="login_registerButton"
          onClick={register}
          disabled={processing}
        >
          {processing && operation === "register" ? (
            <CircularProgress size="20px" />
          ) : (
            "Create your Amazon account"
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
