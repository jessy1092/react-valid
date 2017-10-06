import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import required from '../../src/validators/required';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input enter empty value', done => {
  const valle = createValle();
  valle.addMethods(required);

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual(
      'This required value. Please check your value and try again.',
    );
    expect(wrapper.render()).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput required onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });
});

test('It sould be valid if input has value', done => {
  const valle = createValle();
  valle.addMethods(required);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('jessy1092@gmail.com');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper.render()).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput required onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092@gmail.com',
    },
  });
});
