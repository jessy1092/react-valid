import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import isNumeric from '../../src/validators/isNumeric';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input does not contains only number', () => {
  const valle = createValle();
  valle.addMethods(isNumeric);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isNumeric />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual(
    'Hi does not contain only numbers. Please check your value and try again.',
  );
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input contains only number', () => {
  const valle = createValle();
  valle.addMethods(isNumeric);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isNumeric />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '0000768123',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});
