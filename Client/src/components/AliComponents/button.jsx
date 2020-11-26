import React from 'react';
import './button.scss';


const button = (props) => {
    return (
        
    <button className="btn btn-primary">{props.name}</button>
        
    );
};

export default button;