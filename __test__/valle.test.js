import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../src';

import Input from './fakeComponent/Input';

test('It sould be valid if input has value', () => {
  const valle = createValle();
  valle.addMethod('required', value => value !== '', 'It should have value');

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput required />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '1',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper).toMatchSnapshot();
});

test('It sould be not valid if input has empty', () => {
  const valle = createValle();
  valle.addMethod('required', value => value !== '', 'It should have value');

  const ValidInput = valle.connect(Input);
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

test('It could add custom methods through addMethods', () => {
  const valle = createValle();

  valle.addMethods({
    required: {
      method: value => value !== '',
      message: 'It should have value',
    },
  });

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput required />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '1',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper).toMatchSnapshot();
});

test('It could add template message to custom message', () => {
  const valle = createValle();

  valle.addMethods({
    empty: {
      method: value => value === '',
      message: valle.template`It has value: ${0}`,
    },
  });

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput empty />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual('It has value: Hi');
  expect(wrapper).toMatchSnapshot();
});
