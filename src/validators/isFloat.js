import isFloat from 'validator/lib/isFloat';

import { template } from '../core';

import { isEmpty } from './util';

export default {
  isFloat: {
    method: (value, option) => isEmpty(value) || isFloat(value, option),
    message: template`${0} is not a fload value or not in the range. Please check your value and try again.`,
  },
};
