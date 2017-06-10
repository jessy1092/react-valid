import isNumeric from 'validator/lib/isNumeric';

import { template } from '../core';

import { isEmpty } from './util';

export default {
  isNumeric: {
    method: value => isEmpty(value) || isNumeric(value),
    message: template`${0} does not contain only numbers. Please check your value and try again.`,
  },
};
