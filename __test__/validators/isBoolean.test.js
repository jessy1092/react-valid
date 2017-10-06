import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import isBoolean from '../../src/validators/isBoolean';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input is not Boolean value', done => {
  const valle = createValle();
  valle.addMethods(isBoolean);

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('Hi');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual(
      'Hi is not a boolean value. Please check your value and try again.',
    );
    expect(wrapper.render()).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isBoolean onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });
});

test('It sould be valid if input is Boolean value', done => {
  const valle = createValle();
  valle.addMethods(isBoolean);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('false');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper.render()).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isBoolean onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'false',
    },
  });
});

test('It sould be valid if input is empty', done => {
  const valle = createValle();
  valle.addMethods(isBoolean);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper.render()).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isBoolean onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });
});
