import isISO8601 from 'validator/lib/isISO8601';

import { template } from '../core';

import { isEmpty } from './util';

export default {
  isISO8601: {
    method: value => isEmpty(value) || isISO8601(value),
    message: template`${0} is not a valid ISO 8601 date. Please check your value and try again.`,
  },
};
