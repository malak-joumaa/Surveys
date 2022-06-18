import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Survey from "./components/Survey";
import User from "./components/User";

function App() {
  //Add Title
  const [title, setTitle] = useState("");

  // Adding Survey
  const AddSurvey = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/admin/add_survey", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjU1NTUyNzk0LCJleHAiOjE2NTU1NTYzOTQsIm5iZiI6MTY1NTU1Mjc5NCwianRpIjoic2pVSmhta3NUZFAzdm9VMSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.EynWD-GlMv2jnGKRxPWtT7dEsMNP2_93eLJ4hjr8vVw"
      },
      body: JSON.stringify({
        title:title,
      }),
    });
    const data = await res.json();
    window.localStorage.setItem("survey_id",data.survey.id)
  };
  return (
    <BrowserRouter>
      <Routes>  
        <Route
        path="/"
          element={
              <div>
                  <div>
                    {/* Title input */}
                  <label>Title</label> <br/>
                  <input id="title" value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  
                  /><br/>
                  {/* Add Survey button */}
                  <Link to="/Survey"><button
                  onClick={()=>{
                    AddSurvey()
                  }}
                  >Add Survey</button></Link>
                  </div>
              </div>
          }
        ></Route>
        <Route
          path="/survey"
          element={<Survey/>}
        ></Route>
        <Route
          path="/user"
          element={<User/>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
