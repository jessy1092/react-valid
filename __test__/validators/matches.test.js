import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import matches from '../../src/validators/matches';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input does not match the pattern', done => {
  const valle = createValle();
  valle.addMethods(matches);

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('Hi');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual(
      'Hi does not match the pattern /abc/i. Please check your value and try again.',
    );
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(
    <ValidInput matches={/abc/i} onInvalid={value => onInvalid(wrapper, value)} />,
  );

  wrapper.find('input').simulate('change', {
    target: {
      value: 'Hi',
    },
  });
});

test('It sould be valid if input matches the pattern', done => {
  const valle = createValle();
  valle.addMethods(matches);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('qwe2abcasdw');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput matches={/abc/i} onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'qwe2abcasdw',
    },
  });
});

test('It sould be valid if input is empty', done => {
  const valle = createValle();
  valle.addMethods(matches);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput matches={/abc/i} onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });
});
