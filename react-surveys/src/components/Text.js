import React, {useState} from "react";

const Text = (props) => {
    const [ques_text, setQues_text] = useState("");
    return ( 
        <div>
            <input val={props.id} value={ques_text}
                onChange={(e) => {
                    setQues_text(e.target.value);}}>
            </input>
        </div>
     );
}
 
export default Text;