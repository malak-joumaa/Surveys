import React, { useState } from "react";
import Select from "../components/Select";

const Survey = () => {
  //set question type
  const [type, setType] = useState("");

  //add a text component
  const [textList, setTextList] = useState([]);

  //set select
  const [select, setSelect] = useState([]);

  // Handle add text input
  const handleAddText = () => {
    setTextList([...textList, { type_id: 1 }]);
  };

  // Handle select input
  const handleAddSelect = () => {
    setSelect([...select, " "]);
  };

  // Get text of inputs
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...textList];
    list[index][name] = value;
    setTextList(list);
  };

  // Post questions to database
  const AddQuestion = async (question, type_id) => {
    const res = await fetch("http://127.0.0.1:8000/api/admin/add_question", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        question: question,
        quetsion_type_id: type_id,
        survey_id: localStorage.getItem("survey_id"),
      }),
    });
    const data = await res.json();
    window.localStorage.setItem("question_id", data.question.id);
  };
  console.log(textList);

  return (
    <>
      <h1>Survey</h1>
      <div id="create">
        {/* select question type */}
        <select
          className="txt"
          onChange={(e) => {
            const selectedType = e.target.value;
            setType(selectedType);
          }}
        >
          <option value={"text"}>Text</option>
          <option value={"checkbox"}>Checkbox</option>
          <option value={"dropdown"}>DropDown</option>
          <option value={"radioButton"}>RadioButton</option>
          <option value={"date"}>Date</option>
          <option value={"time"}>Time</option>
        </select>

        {/* Add text inputs */}
        <button
          className="create-btn"
          onClick={() => {
            if (type == "text") {
              handleAddText();
            } else if (type == "dropdown") {
              handleAddSelect();
            }
          }}
        >
          Add question
        </button>

        <br />

        {/* Display text inputs */}
        {textList.map((singleText, index) => (
          <div key={index}>
            <input
              name="text"
              type="text"
              value={singleText.text}
              className="txt"
              onChange={(e) => handleServiceChange(e, index)}
            ></input>
          </div>
        ))}

        {select.map((index) => (
          <Select key={index} />
        ))}

        {/* Send questions to database */}
        <button
          className="create-btn"
          onClick={(e) => {
            e.preventDefault();
            for (var i = 0; i < textList.length; i++) {
              AddQuestion(textList[i].text, textList[i].type_id);
            }
          }}
        >
          Sumbit Survey
        </button>
      </div>
    </>
  );
};

export default Survey;
