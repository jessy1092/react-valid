export default {
  required: {
    method: value => typeof value !== 'undefined' && value !== null && value !== '',
    message: 'This required value. Please check your value and try again.',
  },
};
