import { isEmpty } from './util';

export default {
  required: {
    method: value => !isEmpty(value),
    message: 'This required value. Please check your value and try again.',
  },
};
