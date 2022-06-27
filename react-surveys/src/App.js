import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Fillsurvey from "./components/Fillsurvey";
import Survey from "./components/Survey";
import User from "./components/User";
import Addsurvey from "./components/Addsurvey";
import SingIn from "./components/SingIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SingIn />}></Route>
        <Route path="/add-survey" element={<Addsurvey />}></Route>
        <Route path="/survey" element={<Survey />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/fill-survey" element={<Fillsurvey />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
