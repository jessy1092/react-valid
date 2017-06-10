import equals from 'validator/lib/equals';

import { template } from '../core';

import { isEmpty } from './util';

export default {
  equals: {
    method: (value, comparison) => isEmpty(value) || equals(value, comparison),
    message: template`This does not equal ${1}. Please check your value and try again.`,
  },
};
