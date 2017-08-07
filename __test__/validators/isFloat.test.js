import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import isFloat from '../../src/validators/isFloat';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input is not Float value', done => {
  const valle = createValle();
  valle.addMethods(isFloat);

  const ValidInput = valle.connect(Input);

  // Test asynchronous to get the right state
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('Hi');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual(
      'Hi is not a fload value or not in the range. Please check your value and try again.',
    );
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isFloat onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });
});

test('It sould be valid if input is Float value', done => {
  const valle = createValle();
  valle.addMethods(isFloat);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('0.1');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isFloat onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '0.1',
    },
  });
});

test('It sould be in the range if input set min/max range', done => {
  const valle = createValle();
  valle.addMethods(isFloat);

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('0.1');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual(
      '0.1 is not a fload value or not in the range. Please check your value and try again.',
    );
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(
    <ValidInput isFloat={{ min: 10, max: 15 }} onInvalid={value => onInvalid(wrapper, value)} />,
  );

  wrapper.find('input').simulate('change', {
    target: {
      value: '0.1',
    },
  });
});

test('It sould be valid if input is empty', done => {
  const valle = createValle();
  valle.addMethods(isFloat);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isFloat onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });
});
