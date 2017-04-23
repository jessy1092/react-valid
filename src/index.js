import { addMethod, addMethods, connect, template } from './core';

import isEmail from './validators/isEmail';
import contains from './validators/contains';

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
    template,
  };
}

const valle = createValle();

valle.addMethods(isEmail);
valle.addMethods(contains);

export default valle;
