import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import isBoolean from '../../src/validators/isBoolean';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input is not Boolean value', () => {
  const valle = createValle();
  valle.addMethods(isBoolean);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isBoolean />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual(
    'Hi is not a boolean value. Please check your value and try again.',
  );
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input is Boolean value', () => {
  const valle = createValle();
  valle.addMethods(isBoolean);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput isBoolean />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'false',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});
