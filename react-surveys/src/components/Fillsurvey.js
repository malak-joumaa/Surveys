import React, { useState, useEffect} from 'react'

const Fillsurvey = () => {
    const [quest, setQuestion] = useState([]);
    const [answer, setAnswer] = useState([{text:"",question_id:0}]); 
    
    useEffect(()=>{
        fetchQuestions()
        var newarr = []
        for(var i=1;i<quest.length;i++){
            newarr.push({text:"",question_id:0})
        }
        setAnswer([...answer,...newarr])
    },[])

    const fetchQuestions = async () => {
        const res = await fetch("http://127.0.0.1:8000/api/admin/get_question/1");
        var data = await res.json();
        console.log(data)
        setQuestion(data.question);
    };

    console.log(quest);
    console.log(answer);

    const handleAnswerChange = (e, index,id)=>{
        const {name,value} = e.target
        const list = [...answer];
        list[index][name] = value;
        list[index].question_id = id;
        setAnswer(list)
    }

    // Post answers to database
    const AddAnswers = async (answer, question_id) => {
        const res = await fetch("http://127.0.0.1:8000/api/user/add_answer", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjU1NTUyNzk0LCJleHAiOjE2NTU1NTYzOTQsIm5iZiI6MTY1NTU1Mjc5NCwianRpIjoic2pVSmhta3NUZFAzdm9VMSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.EynWD-GlMv2jnGKRxPWtT7dEsMNP2_93eLJ4hjr8vVw"
          },
          body: JSON.stringify({
            answer:answer,
            question_id: question_id,
            survey_id:1,
          }),
        });
    }

  return (
    <div>
        <h1>Survey</h1>
        {quest.map((singleSurvey, index)=> (
            <div key={index}>
            <div id={quest[index].id}>{quest[index].question}</div>
            <br/>
            <input name ="text" type="text" qid="question_id" id={quest[index].id} value={singleSurvey.text}
                onChange={(e) => handleAnswerChange(e, index,quest[index].id)}
                ></input>
            </div>
        ))}
        <button
        onClick={(e)=>{
            e.preventDefault();
            for(var i=0; i<answer.length; i++){
                AddAnswers(answer[i].text,answer[i].question_id)
            }
        }}
        >Submit</button>
    </div>
  );
};

export default Fillsurvey