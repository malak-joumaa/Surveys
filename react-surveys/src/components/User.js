import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


const User = () => {
    const [survey, setSurvey] = useState([]);
    
    useEffect(() => {
        const getTasks = async () => {
          const surveysFromServer = await fetchSurveys();
          console.log(surveysFromServer);
          setSurvey(surveysFromServer);
        };
        getTasks();
      }, []);

    //Get all surveys
    const fetchSurveys = async () => {
        try {
          const res = await fetch("http://127.0.0.1:8000/api/admin/get_survey");
          const data = await res.json();
          return data;
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div>
        <h1>Survey</h1>
        <h2>The only online survey maker you need</h2>
        <div>
            {survey.survey.map((singleSurvey, index)=> (
                <div key={index}>
                <Link to="/fill-survey">
                <div id={survey.survey[index].id}>{survey.survey[index].title}</div>
                </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default User