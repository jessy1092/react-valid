import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import valle from '../src';
import Input from './component/Input';

// User defined validator
valle.addMethod('required', value => value !== '', 'It should have value');

// Use HOC to connect component
const ValidInput = valle.connect(Input);

ReactDOM.render(
  <AppContainer>
    {
      // Just pass properties to tell valle which validator you want to use
    }
    <ValidInput required />
  </AppContainer>,
  document.getElementById('content'),
);
