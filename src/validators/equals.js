import equals from 'validator/lib/equals';

import { template } from '../core';

export default {
  equals: {
    method: (value, comparison) => equals(value, comparison),
    message: template`This does not equal ${1}. Please check your value and try again.`,
  },
};
