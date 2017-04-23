import React from 'react';
import { mount } from 'enzyme';

import { addMethod, addMethods, connect, template } from '../src/core';

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

test('It could use template to generate message', () => {
  const messageGenerator = template`${0} is the default value`;

  expect(messageGenerator('default')).toEqual('default is the default value');
});

test('It could use template to generate message with property value', () => {
  const messageGenerator = template`${1} is the property value`;

  expect(messageGenerator('', 'property value')).toEqual('property value is the property value');
});

test('It could use template to generate message with property number value', () => {
  const messageGenerator = template`${1} is the property number value`;

  expect(messageGenerator('', 321)).toEqual('321 is the property number value');
});

test('It could use template to generate message with property object value', () => {
  const messageGenerator = template`${'foo'} is the property object value`;

  expect(messageGenerator('', { foo: 'hi' })).toEqual('hi is the property object value');
});
