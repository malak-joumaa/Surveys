import React, { useState} from "react";

const Survey = () => {
    //set question type
    const [type, setType] = useState('');

    //add a text component
    const [textList, setTextList] = useState([{text:"",type_id:1}])

    // Handle add text input
    const handleAddText = () => {
        setTextList([...textList,{text:"",type_id:1}])
    }

    // Get text of inputs
    const handleServiceChange = (e, index)=>{
        const {name,value} = e.target
        const list = [...textList];
        list[index][name] = value;
        setTextList(list);
    }
    // Post questions to database
    const AddQuestion = async (question, type_id) => {
        const res = await fetch("http://127.0.0.1:8000/api/admin/add_question", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjU1NTUyNzk0LCJleHAiOjE2NTU1NTYzOTQsIm5iZiI6MTY1NTU1Mjc5NCwianRpIjoic2pVSmhta3NUZFAzdm9VMSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.EynWD-GlMv2jnGKRxPWtT7dEsMNP2_93eLJ4hjr8vVw"
          },
          body: JSON.stringify({
            question:question,
            quetsion_type_id: type_id,
            survey_id:1,
          }),
        });
    }
    console.log(textList)
  return (
    <div>
        {/* select question type */}
        <select 
        onChange={(e) =>{
            const selectedType = e.target.value;
            setType(selectedType)
        }}>
            <option value={"text"}>Text</option>
            <option value={"checkbox"}>Checkbox</option>
            <option value={"dropdown"}>DropDown</option>
            <option value={"radioButton"}>RadioButton</option>
            <option value={"date"}>Date</option>
            <option value={"time"}>Time</option>
        </select>

        {/* Add text inputs */}
        <button onClick={()=>{
            if(type =="text"){
                handleAddText();
            }
        }}>Add question
        </button>

        <br/>

        {/* Display text inputs */}
        {textList.map((singleText, index)=> (
            <div key={index}>
                <input name ="text" type="text" value={singleText.text}
                onChange={(e) => handleServiceChange(e, index)}>
                </input>
            </div>
        ))}
        
        {/* Send questions to database */}
        <button
        onClick={(e)=>{
            e.preventDefault();
            for(var i=0; i<textList.length; i++){
                AddQuestion(textList[i].text,textList[i].type_id)
            }
        }}
        >Sumbit Survey</button>
    </div>
  );
};

export default Survey;