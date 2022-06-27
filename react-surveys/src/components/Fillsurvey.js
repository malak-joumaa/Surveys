import React, { useState, useEffect } from "react";

const Fillsurvey = () => {
  const [quest, setQuestion] = useState([]);
  const [selectAns, setSelectAnswer] = useState([]);
  const [answer, setAnswer] = useState([{ text: "", question_id: 0 }]);

  useEffect(() => {
    fetchAnswerChoices();
    fetchQuestions();
    var newarr = [];
    for (var i = 1; i < quest.length; i++) {
      newarr.push({ text: "", question_id: 0 });
    }
    setAnswer([...answer, ...newarr]);
  }, []);

  const fetchQuestions = async () => {
    const res = await fetch(
      "http://127.0.0.1:8000/api/admin/get_question/" +
        localStorage.getItem("survey_id")
    );
    var data = await res.json();
    console.log(data);
    setQuestion(data.question);
  };
  console.log(answer);

  const handleAnswerChange = (e, index, id) => {
    const { name, value } = e.target;
    const list = [...answer];
    list[index][name] = value;
    list[index].question_id = id;
    setAnswer(list);
  };

  // Post answers to database
  const AddAnswers = async (answer, question_id) => {
    const res = await fetch("http://127.0.0.1:8000/api/user/add_answer", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        answer: answer,
        question_id: question_id,
        survey_id: localStorage.getItem("survey_id"),
      }),
    });
  };

  const fetchAnswerChoices = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/admin/get_answer_choice/" +
          localStorage.getItem("survey_id")
      );
      var data = await res.json();
      console.log(data);
      setSelectAnswer(data);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(selectAns);

  return (
    <div>
      <h1>Survey</h1>
      <div className="fill_survey">
        <div className="box">
          <h2 className="title">{localStorage.getItem("survey_name")}</h2>
          {quest.map((singleSurvey, index) => (
            <div key={index} className="lbl-txt">
              <div id={quest[index].id} className="input-label">
                {quest[index].question}
              </div>
              <br />
              {quest[index].quetsion_type_id == 1 ? (
                <input
                  name="text"
                  type="text"
                  qid="question_id"
                  id={quest[index].id}
                  value={singleSurvey.text}
                  className="txtbox"
                  onChange={(e) =>
                    handleAnswerChange(e, index, quest[index].id)
                  }
                ></input>
              ) : (
                <select
                  className="txtbox"
                  id={quest[index].id}
                  name="text"
                  onChange={(e) => {
                    handleAnswerChange(e, index, quest[index].id);
                  }}
                >
                  {selectAns[index].map((singleOption, optindex) => (
                    <option key={optindex} value={selectAns[index][optindex]}>
                      {selectAns[index][optindex]}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
          <button
            className="submit"
            onClick={(e) => {
              e.preventDefault();
              for (var i = 0; i < answer.length; i++) {
                AddAnswers(answer[i].text, answer[i].question_id);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fillsurvey;
