import React from 'react';

export function createValle() {
  const validates = {};

  const addMethod = (name, validate, message = '') => {
    validates[name] = {
      validate,
      message,
    };
  };

  const connect = Component => {
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

        const status = Object.keys(validates).every(name => {
          if (Object.prototype.hasOwnProperty.call(other, name)) {
            if (!validates[name].validate(value, this.props[name])) {
              message = validates[name].message;
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
    ValidComponent.displayName = `Vali(${displayName})`;

    return ValidComponent;
  };

  return {
    addMethod,
    connect,
  };
}

export default createValle();
