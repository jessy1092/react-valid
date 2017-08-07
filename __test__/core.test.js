import React from 'react';
import { mount } from 'enzyme';

import { addMethod, addMethods, connect, template, setMessages } from '../src/core';

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

test('It could overriide default message through setMessages', () => {
  const validators = {};
  const appendValidators = {
    required: {
      method: value => value !== '',
      message: 'It should have value',
    },
  };

  const newValidators = addMethods(validators, appendValidators);
  const overrideValidators = setMessages(newValidators, {
    required: 'The message was overrided',
  });

  expect(overrideValidators.required.message).toEqual('The message was overrided');
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

test('It sould be return valle component if connect the basic component', done => {
  const validators = {
    required: {
      method: value => value !== '',
      message: 'It should have value',
    },
  };

  const ValidInput = connect(validators, Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual('It should have value');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput required onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });
});

test('It sould has validatorKeys if component set validators', () => {
  const validators = {
    required: {
      method: value => value !== '',
      message: 'It should have value',
    },
  };

  const ValidInput = connect(validators, Input);
  const wrapper = mount(<ValidInput required />);

  expect(wrapper.state('validatorKeys')).toEqual(['required']);
});

test('It could pass through custom property', () => {
  const ValidInput = connect({}, Input);
  const wrapper = mount(<ValidInput className="test" />);

  expect(wrapper.find('Input').prop('className')).toEqual('test');
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

test('It could use template to generate message with property regex value', () => {
  const messageGenerator = template`${1} is the property regex value`;

  expect(messageGenerator('', /abc/i)).toEqual('/abc/i is the property regex value');
});

test('It could use template to generate message with property object value', () => {
  const messageGenerator = template`${'foo'} is the property object value`;

  expect(messageGenerator('', { foo: 'hi' })).toEqual('hi is the property object value');
});
