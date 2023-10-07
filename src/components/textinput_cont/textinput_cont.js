import React from 'react';
import './textinput_cont.css'; // นำเข้าไฟล์ CSS

function TextInput(props) {
    return (
        <div className="input-container-cont">
            <input
                type="text"
                className="text-input"
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default TextInput;