import isNumeric from 'validator/lib/isNumeric';

import { template } from '../core';

export default {
  isNumeric: {
    method: value => isNumeric(value),
    message: template`${0} does not contain only numbers. Please check your value and try again.`,
  },
};
