import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Fillsurvey from "./components/Fillsurvey";
import Survey from "./components/Survey";
import User from "./components/User";
import Addsurvey from "./components/Addsurvey";

function App() {

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
                    <br/>
                    <input type="email" id="email" className="txtbox"/>
                    <br/>
                    <label className="input-label">Password</label>
                    <br/>
                    <input type="password" id="password" className="txtbox"/>
                    <br/>
                    <button className="submit">Sign in</button>
                    </div>
                </form>
              </div>
            </>
          }
        ></Route>
        <Route
          path="/add-survey"
          element={<Addsurvey/>}
        ></Route>
        <Route
          path="/survey"
          element={<Survey/>}
        ></Route>
        <Route
          path="/user"
          element={<User/>}
        ></Route>
        <Route
          path="/fill-survey"
          element={<Fillsurvey/>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
