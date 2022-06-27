import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const User = (logout = "") => {
  const navigate = useNavigate();
  const [survey, setSurvey] = useState([]);

  useEffect(() => {
    fetchSurveys();
  }, []);

  //Get all surveys
  const fetchSurveys = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/admin/get_survey");
      const data = await res.json();
      setSurvey(data.survey);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(survey);
  return (
    <div>
      <h1>Survey</h1>
      <span className="slogan">The only online survey maker you need</span>
      <br />
      <div id="logoutDiv">
        {logout.logout == "logout" ? (
          <span
            className="logout"
            onClick={() => {
              navigate("/");
              localStorage.removeItem("survey_id");
              localStorage.removeItem("question_id");
              localStorage.removeItem("survey_name");
              localStorage.removeItem("token");
            }}
          >
            Logout
          </span>
        ) : (
          <></>
        )}
      </div>
      <div id="surveys-div">
        {survey.map((singleSurvey, index) => (
          <div key={index}>
            <Link to="/fill-survey">
              <div
                id={survey[index].id}
                className="one-survey"
                onClick={() => {
                  window.localStorage.setItem("survey_id", survey[index].id);
                  window.localStorage.setItem(
                    "survey_name",
                    survey[index].title
                  );
                }}
              >
                <span>{survey[index].title}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
