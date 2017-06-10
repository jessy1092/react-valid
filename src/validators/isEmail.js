import isEmail from 'validator/lib/isEmail';

import { isEmpty } from './util';

export default {
  isEmail: {
    method: value => isEmpty(value) || isEmail(value),
    message: 'This is not a valid email address. Please check your email and try again.',
  },
};
