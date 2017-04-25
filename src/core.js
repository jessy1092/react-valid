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
        validatorKeys: [],
      };

      this.validate = this.validate.bind(this);
    }

    componentWillMount() {
      const validatorKeys = Object.keys(validators).filter(name =>
        Object.prototype.hasOwnProperty.call(this.props, name),
      );
      this.setState({
        validatorKeys,
      });
    }

    componentWillReceiveProps(nextProps) {
      const validatorKeys = Object.keys(validators).filter(name =>
        Object.prototype.hasOwnProperty.call(nextProps, name),
      );
      this.setState({
        validatorKeys,
      });
    }

    validate(value) {
      const { onInvalid = () => {}, onValid = () => {} } = this.props;
      const { validatorKeys } = this.state;
      let message = '';

      const status = validatorKeys.every(name => {
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
        return true;
      });

      this.setState(
        {
          valid: status,
          message,
        },
        () => {
          if (!status) {
            onInvalid(value);
          } else {
            onValid(value);
          }
        },
      );
    }

    render() {
      const childrenProps = {};
      const { validatorKeys, valid, message } = this.state;

      Object.keys(this.props).forEach(name => {
        if (validatorKeys.indexOf(name) === -1 && name !== 'onValid' && name !== 'onInvalid') {
          childrenProps[name] = this.props[name];
        }
      });

      return (
        <Component {...childrenProps} valid={valid} message={message} validate={this.validate} />
      );
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
      value = typeof props === 'string' || !isNaN(props) || props instanceof RegExp
        ? props
        : props[key];
    } else {
      value = props[key];
    }
    result.push(value, strings[i + 1]);
  });
  return result.join('');
};
