import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import contains from '../../src/validators/contains';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input does not contains string', done => {
  const valle = createValle();
  valle.addMethods(contains);

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('jessy1092');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual(
      'This does not contain Hi. Please check your value and try again.',
    );
    expect(wrapper.render()).toMatchSnapshot();
    done();
  };
  const wrapper = mount(
    <ValidInput contains="Hi" onInvalid={value => onInvalid(wrapper, value)} />,
  );

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092',
    },
  });
});

test('It sould be valid if input contains string', done => {
  const valle = createValle();
  valle.addMethods(contains);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('jessy1092');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper.render()).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput contains="jessy" onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092',
    },
  });
});

test('It sould be valid if input is empty', done => {
  const valle = createValle();
  valle.addMethods(contains);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper.render()).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput contains="jessy" onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });
});
