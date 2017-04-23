import React from 'react';
import { mount } from 'enzyme';

import { addMethod, addMethods, connect } from '../src/core';

import Input from './fakeComponent/Input';

test('It could add custom method through addMethod', () => {
  const validators = {};
  const validatorName = 'required';
  const validatorMethod = value => value !== '';
  const validatorMessage = 'It should have value';

  const newValidators = addMethod(validators, validatorName, validatorMethod, validatorMessage);

  expect(newValidators[validatorName].message).toEqual(validatorMessage);
  expect(newValidators[validatorName].method).toEqual(validatorMethod);
});

test('It could add custom methods through addMethods', () => {
  const validators = {};
  const appendValidators = {
    required: {
      method: value => value !== '',
      message: 'It should have value',
    },
  };

  const newValidators = addMethods(validators, appendValidators);

  expect(newValidators).toEqual(appendValidators);
});

test('It sould be return valle component if connect the basic component', () => {
  const validators = {
    required: {
      method: value => value !== '',
      message: 'It should have value',
    },
  };

  const ValidInput = connect(validators, Input);
  const wrapper = mount(<ValidInput required />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual('It should have value');
  expect(wrapper).toMatchSnapshot();
});
