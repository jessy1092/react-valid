import React from 'react';
import ReactDOM from 'react-dom';

import valle from '../src';
import Input from './component/Input';

// User defined validator
valle.addMethod('required', value => value !== '', 'It should have value');

// Use HOC to connect component
const ValidInput = valle.connect(Input);

ReactDOM.render(
  // Just pass properties to tell valle which validator you want to use
  <ValidInput required />,
  document.getElementById('content'),
);
