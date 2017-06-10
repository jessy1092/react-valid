import matches from 'validator/lib/matches';

import { template } from '../core';

import { isEmpty } from './util';

export default {
  matches: {
    method: (value, pattern) => isEmpty(value) || matches(value, pattern),
    message: template`${0} does not match the pattern ${1}. Please check your value and try again.`,
  },
};
