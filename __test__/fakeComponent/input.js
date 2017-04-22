import React from 'react';

const Input = ({ validate, message }) => (
  <div>
    <input onChange={e => validate(e.target.value)} />
    <div>{message}</div>
  </div>
);

export default Input;
