import React, { useState} from "react";
import Text from "./Text";

const Survey = () => {
    //set question type
    const [type, setType] = useState('');
    //add a text component
    const [addtext, setAddText] = useState([{text:""}])
    const handleText = () => {
        setAddText([...addtext,{text:""}])
    }
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
        <button onClick={()=>{
            if(type =="text"){
                handleText();
            }
        }}>Add question
        </button>
        <br/>
        {/* Question type text */}
        {addtext.map((onetext, index)=> (
            <div key={index}>
                <Text/>
            </div>
        ))}
        
    </div>
  );
};

export default Survey;