import React, { useState, useEffect} from 'react'

const Fillsurvey = () => {
    const [question, setQuestion] = useState([]);
    useEffect(() => {
        const getQuestions = async () => {
          const questionsFromServer = await fetchQuestions();
          console.log(questionsFromServer);
          setQuestion(questionsFromServer);
        };
         getQuestions();
        
      },[]);
      console.log(question.question.length);
        var newarr = []
        for(var i=1;i<question.question.length;i++){
            newarr.push({text:"",type_id:1})
        }
        console.log("here")
        console.log(newarr)
    const [answer, setAnswer] = useState([{text:"",type_id:1},...newarr]);

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
      const handleAnswerChange = (e, index)=>{
        const {name,value} = e.target
        const list = [...answer];
        list[index][name] = value;
        setAnswer(list)
    }
    console.log(answer)
  return (
    <div>
        {question.question.map((singleSurvey, index)=> (
            <div key={index}>
            <div id={question.question[index].id}>{question.question[index].question}</div>
            <br/>
            <input name ="text" type="text" value={singleSurvey.text}
                onChange={(e) => handleAnswerChange(e, index)}>
                </input>
            </div>
        ))}
    </div>
  )
}

export default Fillsurvey