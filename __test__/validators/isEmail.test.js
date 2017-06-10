import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import isEmail from '../../src/validators/isEmail';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input without email', () => {
  const valle = createValle();
  valle.addMethods(isEmail);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isEmail />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual(
    'This is not a valid email address. Please check your email and try again.',
  );
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input email', () => {
  const valle = createValle();
  valle.addMethods(isEmail);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isEmail />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092@gmail.com',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input is empty', () => {
  const valle = createValle();
  valle.addMethods(isEmail);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isEmail />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});
