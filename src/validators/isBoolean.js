import isBoolean from 'validator/lib/isBoolean';

import { template } from '../core';

export default {
  isBoolean: {
    method: value => isBoolean(value),
    message: template`${0} is not a boolean value. Please check your value and try again.`,
  },
};
