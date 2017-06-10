import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import contains from '../../src/validators/contains';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input does not contains string', () => {
  const valle = createValle();
  valle.addMethods(contains);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput contains="Hi" />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual(
    'This does not contain Hi. Please check your value and try again.',
  );
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input contains string', () => {
  const valle = createValle();
  valle.addMethods(contains);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput contains="jessy" />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input is empty', () => {
  const valle = createValle();
  valle.addMethods(contains);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput contains="jessy" />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});
