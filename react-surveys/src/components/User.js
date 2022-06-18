import React, { useState, useEffect} from 'react'

const User = () => {
    
    useEffect(() => {
        const getTasks = async () => {
          const surveysFromServer = await fetchSurveys();
          console.log(surveysFromServer);
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
    <div>User</div>
  )
}

export default User