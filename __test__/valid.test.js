import React from 'react';
import { mount } from 'enzyme';

import valid from '../src';

import Input from './fakeComponent/Input';

valid.addMethod('required', value => value !== '', 'It should have value');

test('It sould be valid if input has value', () => {
  const ValidInput = valid.connect(Input);
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
  const ValidInput = valid.connect(Input);
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
