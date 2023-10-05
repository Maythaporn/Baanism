import React from 'react';
import { Link } from 'react-router-dom';
import "./button.css";

function Button(props) {
    return (
        <button className="button">{props.name}
        </button>
    );
}

export default Button; 


