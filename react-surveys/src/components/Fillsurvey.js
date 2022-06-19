import React, { useState, useEffect} from 'react'

const Fillsurvey = () => {
    const [question, setQuestion] = useState([]);
    
    useEffect(() => {
        const getQuestions = async () => {
          const questionsFromServer = await fetchQuestions();
          console.log(questionsFromServer);
          setQuestion(questionsFromServer);
        };
        console.log(question)
        getQuestions();
        
      },[]);

    //Get all surveys
    const fetchQuestions = async () => {
        try {
          const res = await fetch("http://127.0.0.1:8000/api/admin/get_question/1");
          const data = await res.json();
          return data;
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <div>
        {question.question.map((singleSurvey, index)=> (
            <div key={index}>
            <div id={question.question[index].id}>{question.question[index].question}</div>
            </div>
        ))}
    </div>
  )
}

export default Fillsurvey