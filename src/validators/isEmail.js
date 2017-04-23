import isEmail from 'validator/lib/isEmail';

export default {
  isEmail: {
    method: value => isEmail(value),
    message: 'This is not a valid email address. Please check your email and try again.',
  },
};
