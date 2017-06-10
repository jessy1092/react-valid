import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import equals from '../../src/validators/equals';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input does not equals string', () => {
  const valle = createValle();
  valle.addMethods(equals);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput equals="Hi" />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual(
    'This does not equal Hi. Please check your value and try again.',
  );
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input equals string', () => {
  const valle = createValle();
  valle.addMethods(equals);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput equals="jessy" />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input is empty', () => {
  const valle = createValle();
  valle.addMethods(equals);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput equals="jessy" />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});
