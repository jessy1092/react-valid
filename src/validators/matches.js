import matches from 'validator/lib/matches';

import { template } from '../core';

export default {
  matches: {
    method: (value, pattern) => matches(value, pattern),
    message: template`${0} does not match the pattern ${1}. Please check your value and try again.`,
  },
};
