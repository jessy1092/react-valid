import React from 'react';
import ReactDOM from 'react-dom';

import valid from '../src';
import Input from './component/Input';

// User defined validator
valid.addMethod('required', value => value !== '', 'It should have value');

// Use HOC to connect component
const ValidInput = valid.connect(Input);

ReactDOM.render(
  // Just pass properties to tell react-valid which validator you want to use
  <ValidInput required />,
  document.getElementById('content'),
);
