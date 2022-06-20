import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Fillsurvey from "./components/Fillsurvey";
import Survey from "./components/Survey";
import User from "./components/User";
import Addsurvey from "./components/Addsurvey";

function App() {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
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
    window.localStorage.setItem("token", data.access_token);
    console.log(data);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Survey</h1>
              <div id="sign-in">
                <form className="fill_survey">
                  <div className="box">
                    <h2 className="title">Sign In</h2>
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
                    <Link to="/add-survey">
                      <button
                        className="submit"
                        onClick={() => {
                          signIn();
                        }}
                      >
                        Sign in
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </>
          }
        ></Route>
        <Route path="/add-survey" element={<Addsurvey />}></Route>
        <Route path="/survey" element={<Survey />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/fill-survey" element={<Fillsurvey />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
