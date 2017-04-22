import React from 'react';

// react-valid would pass three properties to component
// valid(Boolean): Present component is valid or not
// message(String): Error message if not valid
// validate(Function): Trigger validate. Just pass string value
const Input = ({ validate, message }) => (
  <div>
    <input onChange={e => validate(e.target.value)} />
    <div>{message}</div>
  </div>
);

export default Input;
