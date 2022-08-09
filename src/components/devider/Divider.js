import React from 'react';
import './style.css';

const Divider = ({ onMouseDown }) => (
  <div className="divider" onMouseDown={onMouseDown}/>
);

export default Divider;
