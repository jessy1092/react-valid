import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import isISO8601 from '../../src/validators/isISO8601';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input is not ISO8601 date', done => {
  const valle = createValle();
  valle.addMethods(isISO8601);

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('Hi');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual(
      'Hi is not a valid ISO 8601 date. Please check your value and try again.',
    );
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isISO8601 onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });
});

test('It sould be valid if input is ISO8601 date', done => {
  const valle = createValle();
  valle.addMethods(isISO8601);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('2017-04-26T12:30:48,3-06:00');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isISO8601 onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '2017-04-26T12:30:48,3-06:00',
    },
  });
});

test('It sould be valid if input is empty', done => {
  const valle = createValle();
  valle.addMethods(isISO8601);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput isISO8601 onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });
});
