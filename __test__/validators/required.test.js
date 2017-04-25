import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import required from '../../src/validators/required';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input enter empty value', () => {
  const valle = createValle();
  valle.addMethods(required);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput required />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual(
    'This required value. Please check your value and try again.',
  );
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input has value', () => {
  const valle = createValle();
  valle.addMethods(required);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput required />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092@gmail.com',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});
