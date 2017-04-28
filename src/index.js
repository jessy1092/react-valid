import { addMethod, addMethods, connect, template, setMessages } from './core';

import isEmail from './validators/isEmail';
import contains from './validators/contains';
import equals from './validators/equals';
import isBoolean from './validators/isBoolean';
import isFloat from './validators/isFloat';
import isISO8601 from './validators/isISO8601';
import isInt from './validators/isInt';
import isNumeric from './validators/isNumeric';
import matches from './validators/matches';
import required from './validators/required';

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
    setMessages(overrideValidators) {
      validators = setMessages(validators, overrideValidators);
    },
    template,
  };
}

const valle = createValle();

valle.addMethods(isEmail);
valle.addMethods(contains);
valle.addMethods(equals);
valle.addMethods(isBoolean);
valle.addMethods(isFloat);
valle.addMethods(isISO8601);
valle.addMethods(isInt);
valle.addMethods(isNumeric);
valle.addMethods(matches);
valle.addMethods(required);

export default valle;
