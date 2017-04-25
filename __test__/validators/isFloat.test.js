import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import isFloat from '../../src/validators/isFloat';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input is not Float value', () => {
  const valle = createValle();
  valle.addMethods(isFloat);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isFloat />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual(
    'Hi is not a fload value or not in the range. Please check your value and try again.',
  );
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input is Float value', () => {
  const valle = createValle();
  valle.addMethods(isFloat);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isFloat />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '0.1',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});

test('It sould be in the range if input set min/max range', () => {
  const valle = createValle();
  valle.addMethods(isFloat);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isFloat={{ min: 10, max: 15 }} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '0.1',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual(
    '0.1 is not a fload value or not in the range. Please check your value and try again.',
  );
  expect(wrapper).toMatchSnapshot();
});
