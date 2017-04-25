import isFloat from 'validator/lib/isFloat';

import { template } from '../core';

export default {
  isFloat: {
    method: (value, option) => isFloat(value, option),
    message: template`${0} is not a fload value or not in the range. Please check your value and try again.`,
  },
};
