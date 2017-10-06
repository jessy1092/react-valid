import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import isEmail from '../../src/validators/isEmail';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input without email', done => {
  const valle = createValle();
  valle.addMethods(isEmail);

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('jessy1092');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual(
      'This is not a valid email address. Please check your email and try again.',
    );
    expect(wrapper.render()).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isEmail onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092',
    },
  });
});

test('It sould be valid if input email', done => {
  const valle = createValle();
  valle.addMethods(isEmail);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('jessy1092@gmail.com');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper.render()).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isEmail onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092@gmail.com',
    },
  });
});

test('It sould be valid if input is empty', done => {
  const valle = createValle();
  valle.addMethods(isEmail);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper.render()).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isEmail onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });
});
