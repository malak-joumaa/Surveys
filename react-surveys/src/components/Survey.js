import React, { useState} from "react";

const Survey = () => {
    const [type, setType] = useState('');
  return (
    <div>
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
            if(type =="dropdown"){
                
            }
        }}>Add question
        </button>
        {console.log({type})}
    </div>
  );
};

export default Survey;