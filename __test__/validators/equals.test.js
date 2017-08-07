import React from 'react';
import { mount } from 'enzyme';

import { createValle } from '../../src';
import equals from '../../src/validators/equals';

import Input from '../fakeComponent/Input';

test('It sould be invalid if input does not equals string', done => {
  const valle = createValle();
  valle.addMethods(equals);

  const ValidInput = valle.connect(Input);
  const onInvalid = (wrapper, value) => {
    expect(value).toEqual('jessy1092');
    expect(wrapper.state('valid')).toEqual(false);
    expect(wrapper.state('message')).toEqual(
      'This does not equal Hi. Please check your value and try again.',
    );
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput equals="Hi" onInvalid={value => onInvalid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy1092',
    },
  });
});

test('It sould be valid if input equals string', done => {
  const valle = createValle();
  valle.addMethods(equals);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('jessy');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput equals="jessy" onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: 'jessy',
    },
  });
});

test('It sould be valid if input is empty', done => {
  const valle = createValle();
  valle.addMethods(equals);

  const ValidInput = valle.connect(Input);
  const onValid = (wrapper, value) => {
    expect(value).toEqual('');
    expect(wrapper.state('valid')).toEqual(true);
    expect(wrapper.state('message')).toEqual('');
    expect(wrapper).toMatchSnapshot();
    done();
  };
  const wrapper = mount(<ValidInput equals="jessy" onValid={value => onValid(wrapper, value)} />);

  wrapper.find('input').simulate('change', {
    target: {
      value: '',
    },
  });
});
