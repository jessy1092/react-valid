import contains from 'validator/lib/contains';

import { template } from '../core';

import { isEmpty } from './util';

export default {
  contains: {
    method: (value, seed) => isEmpty(value) || contains(value, seed),
    message: template`This does not contain ${1}. Please check your value and try again.`,
  },
};
