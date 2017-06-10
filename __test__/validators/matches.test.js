import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import matches from '../../src/validators/matches';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input does not match the pattern', () => {
  const valle = createValle();
  valle.addMethods(matches);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput matches={/abc/i} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });

  expect(wrapper.state('valid')).toEqual(false);
  expect(wrapper.state('message')).toEqual(
    'Hi does not match the pattern /abc/i. Please check your value and try again.',
  );
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input matches the pattern', () => {
  const valle = createValle();
  valle.addMethods(matches);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput matches={/abc/i} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'qwe2abcasdw',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});

test('It sould be valid if input is empty', () => {
  const valle = createValle();
  valle.addMethods(matches);

  const ValidInput = valle.connect(Input);
  const wrapper = mount(<ValidInput matches={/abc/i} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });

  expect(wrapper.state('valid')).toEqual(true);
  expect(wrapper.state('message')).toEqual('');
  expect(wrapper).toMatchSnapshot();
});
