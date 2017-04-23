import React from 'react';

export const addMethod = (validators, name, method = () => {}, message = '') => ({
  ...validators,
  [name]: {
    method,
    message,
  },
});

export const addMethods = (validators, appendValidators = {}) => {
  const defaultValidator = {
    method() {},
    message: '',
  };

  const newValidates = {
    ...validators,
  };

  Object.keys(appendValidators).forEach(name => {
    newValidates[name] = {
      ...defaultValidator, // Set default value to prevent method not define
      ...appendValidators[name],
    };
  });

  return newValidates;
};

export const connect = (validators, Component) => {
  const displayName = Component.displayName || Component.name || 'Component';

  class ValidComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        valid: true,
        message: '',
      };

      this.validate = this.validate.bind(this);
    }

    validate(value) {
      const { onError = () => {}, ...other } = this.props;
      let message = '';

      const status = Object.keys(validators).every(name => {
        if (Object.prototype.hasOwnProperty.call(other, name)) {
          if (!validators[name].method(value, this.props[name])) {
            if (typeof validators[name].message === 'string') {
              // Display normal string message
              message = validators[name].message;
            } else {
              // Use template to generate message
              message = validators[name].message(value, this.props[name]);
            }
            return false;
          }
        }
        return true;
      });

      this.setState(
        {
          valid: status,
          message,
        },
        () => {
          if (!status) {
            onError(value);
          }
        },
      );
    }

    render() {
      return <Component {...this.props} {...this.state} validate={this.validate} />;
    }
  }
  ValidComponent.displayName = `Valle(${displayName})`;

  return ValidComponent;
};

export const template = (strings, ...keys) => (validateValue, props) => {
  const result = [strings[0]];
  keys.forEach((key, i) => {
    let value = '';
    if (key === 0) {
      value = validateValue;
    } else if (key === 1) {
      value = typeof props === 'string' || !isNaN(props) ? props : props[key];
    } else {
      value = props[key];
    }
    result.push(value, strings[i + 1]);
  });
  return result.join('');
};
