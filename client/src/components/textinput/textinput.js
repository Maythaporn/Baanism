import React from 'react';
import './textinput.css'; // นำเข้าไฟล์ CSS

function TextInput(props) {
    return (
        <div className="input-container1">
            <input
                type="text"
                className="text-input"
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default TextInput;
