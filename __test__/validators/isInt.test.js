import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import isInt from '../../src/validators/isInt';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input is not Int value', () => {
  const valle = createValle();
  valle.addMethods(isInt);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isInt />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual(
    'Hi is not a int value or not in the range. Please check your value and try again.',
  );
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input is Int value', () => {
  const valle = createValle();
  valle.addMethods(isInt);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isInt />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '1',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});

test('It sould be in the range if input set min/max range', () => {
  const valle = createValle();
  valle.addMethods(isInt);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isInt={{ min: 10, max: 15 }} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '1',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual(
    '1 is not a int value or not in the range. Please check your value and try again.',
  );
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input is empty', () => {
  const valle = createValle();
  valle.addMethods(isInt);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isInt />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});
