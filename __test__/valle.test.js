import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../src';

import Input from './fakeComponent/Input';

test('It sould be valid if input has value', done => {
  const valle = createValle();
  valle.addMethod('required', value => value !== '', 'It should have value');

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('1');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput required onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '1',
    },
  });
});

test('It sould be not valid if input has empty', done => {
  const valle = createValle();
  valle.addMethod('required', value => value !== '', 'It should have value');

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual('It should have value');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput required onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });
});

test('It could add custom methods through addMethods', done => {
  const valle = createValle();

  valle.addMethods({
    empty: {
      method: value => value === '',
      message: 'It should be empty',
    },
  });

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('1');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual('It should be empty');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput empty onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '1',
    },
  });
});

test('It could add template message to custom message', done => {
  const valle = createValle();

  valle.addMethods({
    empty: {
      method: value => value === '',
      message: valle.template`It has value: ${0}`,
    },
  });

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('Hi');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual('It has value: Hi');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput empty onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });
});

test('It could use message method to custom message', done => {
  const valle = createValle();

  valle.addMethods({
    empty: {
      method: value => value === '',
      message: value => `It has value: ${value}`,
    },
  });

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('Hi');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual('It has value: Hi');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput empty onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });
});

test('It could add async custom methods through addMethods', done => {
  const valle = createValle();

  valle.addMethods({
    empty: {
      method: async value => new Promise(resolve => setTimeout(() => resolve(value === ''), 500)),
      message: 'It should be empty after async check',
    },
  });

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('1');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual('It should be empty after async check');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput empty onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '1',
    },
  });
});
