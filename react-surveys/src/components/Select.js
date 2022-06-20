import React, { useEffect, useState } from "react";
function Select() {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [choice, setChoices] = useState([{ text: "" }]);
  console.log(input);
  console.log(select);
  console.log(choice);

  // Handle add option input
  const handleAddOption = () => {
    setChoices([...choice, { text: "" }]);
  };

  //Get option inputs
  const handleOptionChange = (e, index) => {
    const { name, value } = e.target;
    const Olist = [...choice];
    Olist[index] = value;
    setChoices(Olist);
  };

  const AddQuestion = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/admin/add_question", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(
        {
          question: input,
          quetsion_type_id: 2,
          survey_id: localStorage.getItem("survey_id"),
        },
        alert("Question Added")
      ),
    });
    const data = await res.json();
    window.localStorage.setItem("question_id", data.question.id);
    console.log(data);
  };

  const AddChoice = async (choice) => {
    var qid = 1 + parseInt(localStorage.getItem("question_id"));
    console.log(qid);
    const res = await fetch(
      "http://127.0.0.1:8000/api/admin/add_answer_choice",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          choice: choice,
          question_id: qid,
          survey_id: localStorage.getItem("survey_id"),
        }),
      }
    );
  };

  return (
    <div className="selectDiv">
      <div id="choices">
        <h3>Dropdown Question</h3>
        <input
          type="text"
          id="text"
          value={input}
          className="txt"
          onInput={(e) => setInput(e.target.value)}
        />
        <br />
      </div>
      <div className="optDiv">
        <h3>Options</h3>
        {choice.map((singleChoice, index) => (
          <div key={index}>
            <input
              name="text"
              type="text"
              value={singleChoice.text}
              className="txt"
              onChange={(e) => handleOptionChange(e, index)}
            ></input>
          </div>
        ))}
        <button
          id="addChoices"
          className="create-btn"
          onClick={() => {
            handleAddOption();
          }}
        >
          Add Option
        </button>
      </div>
      <div>
        <br />
        <button
          className="create-btn"
          onClick={() => {
            AddQuestion();
            for (var i = 0; i < choice.length; i++) {
              AddChoice(choice[i]);
            }
          }}
        >
          Add Dropdown
        </button>
      </div>
    </div>
  );
}

export default Select;
