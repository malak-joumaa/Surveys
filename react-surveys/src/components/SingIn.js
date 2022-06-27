import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SingIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState("");
  console.log(email);
  console.log(pass);
  // Send data to database
  const signIn = async () => {
    console.log(email, pass);
    const res = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    });
    const data = await res.json();
    console.log(res);
    if (res.status === 200) {
      setTimeout(() => {
        return navigate("/add-survey");
      }, 1500);
      window.localStorage.setItem("token", data.access_token);
      console.log(data);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };
  return (
    <>
      <h1>Survey</h1>
      <div id="sign-in">
        <form className="fill_survey">
          <div className="box">
            <h2 className="title">Sign In</h2>
            {error == "" ? <></> : <span className="error">{error}</span>}
            <label className="input-label">Email</label>
            <br />
            <input
              type="email"
              id="email"
              className="txtbox"
              name="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label className="input-label">Password</label>
            <br />
            <input
              type="password"
              id="password"
              className="txtbox"
              name="text"
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              className="submit"
              onClick={(e) => {
                e.preventDefault();
                if (email == "" || pass == "") {
                  setError("Please fill all fields");
                } else {
                  signIn();
                }
              }}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingIn;
