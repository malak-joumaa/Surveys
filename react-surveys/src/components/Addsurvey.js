import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import User from "../components/User";

const Addsurvey = () => {
  //Add Title
  const [title, setTitle] = useState("");

  // Adding Survey
  const AddSurvey = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/admin/add_survey", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
      }),
    });
    const data = await res.json();
    window.localStorage.setItem("survey_id", data.survey.id);
  };
  return (
    <div>
      <User />
      <div id="add-survey">
        {/* Title input */}
        <label className="lbl">Title</label> <br />
        <input
          id="title"
          value={title}
          className="txt"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        {/* Add Survey button */}
        <Link to="/Survey">
          <button
            id="plus"
            onClick={() => {
              AddSurvey();
            }}
          >
            <span>+</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Addsurvey;
