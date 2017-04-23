import { addMethod, addMethods, connect } from './core';

export function createValle() {
  let validators = {};

  return {
    addMethod(name, method, message) {
      validators = addMethod(validators, name, method, message);
    },
    addMethods(appendValidators) {
      validators = addMethods(validators, appendValidators);
    },
    connect(Component) {
      return connect(validators, Component);
    },
  };
}

export default createValle();
