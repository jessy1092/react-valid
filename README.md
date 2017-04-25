valle
=============
[![npm][npm-image]][npm-url] [![Build Status][travis-ci-image]][travis-ci-url] [![Dependency Status][david-dm-image]][david-dm-url] [![Coverage Status][coverage-status-image]][coverage-status-url]

Help to validate react component easily, functionally and extendable. Powered by Higher-Order Components.

Inspire by

- [Presentational and Container Components -- Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.39eod2kgj).
- [Mixins Are Dead. Long Live Composition -- Dan Abramov](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.xj7geuov2).
- [jQuery validation](https://jqueryvalidation.org/)


## Feature

- **Extendable**: You can defined validator through jQuery-validation-like `addMethod` by yourself
- **Easily**: Just pass the properties to component to control which validator you want to use
- **Functionally**: valle use HOC component to wrap component which want to be valided, so you can wrap any component easily.

## Full Example

You can see the simple example on [example](./example)

```js
import React from 'react';
import ReactDOM from 'react-dom';

import valle from 'valle';

// valle would pass three properties to component
// valid(Boolean): Present component is valid or not
// message(String): Error message if not valid
// validate(Function): Trigger validate. Just pass string value
const Input = ({ validate, message }) => (
  <div>
    <input onChange={e => validate(e.target.value)} />
    <div>{message}</div>
  </div>
);

// User defined validator
valle.addMethod('required', value => value !== '', 'It should have value');

// Use HOC to connect component
const ValidInput = valle.connect(Input);

ReactDOM.render(
	<ValidInput
    required  // Just pass properties to tell valle which validator you want to use
    onValid={value => console.log(`This is valid value: ${value}`)}  // onValid would be called when validate success
    onInvalid={value => console.log(`This is invalid value: ${value}`)}  // onValid would be called when validate falied
  />,
	document.getElementById('content')
);
```

## API

### addMethod(name, method, message)

Could define the custom validator

ex.
```js
valle.addMethod('required', value => value !== '', 'It should have value');
```

#### Arguments

- [`name`]\(*String*): Validator name
- [`method(value, property value)`]\(*Function*): Validator method. it would be called when `validate` be called. It would catch `value`(validate function argument) and `property value`
- [`message`]\(*String*): Validate failed message

### addMethods(validators)

Could define the many custom validators at once

ex. 
```js
valle.addMethods({
  required: {
    method: value => value !== '',
    message: 'It should have value',
  },
});
```

#### Arguments

- [`validators`]\(*Object*): Validators' object, each validator has two key: `method` and `message`

Validator object format:

- [`method(value, property value)`]\(*Function*): Validator method. it would be called when `validate` be called. It would catch `value`(validate function argument) and `property value`
- [`message`]\(*String | Function*): Validate failed message

### connect(Component)

Use Higher-Order component to wrap component.

#### Arguments

- [`Component`]\(*Component*): The Component which want to validate.

### template`Template Strings`

It could use ES6 `Template Strings` to custom message

ex.
```js
valle.addMethods({
  empty: {
    method: value => value === '',
    message: valle.template`It has value: ${0}`,
  },
});
```

#### Template Strings Arguments

- `${0}`: The validate value
- `${1}`: The property value
- `${key}`: If property value is the object, it could use key to read it.

### Message method

You could also set message method instead of template string.

ex.
```js
valle.addMethods({
  empty: {
    method: value => value === '',
    message: value => `It has value: ${value}`,
  },
});
```

#### Arguments

- [`value`]\(*Function*): Current validate value
- [`property value`]\(*String*): The property value

## Todo

- [x] Add default validator. Like `required`, `isEmail`, `isInt`
- [x] Support `addMethods` to add many validators at onece
- [x] Filter properties key to prevent pass unneccessay properties to child component
- etc...

## Contribute
[![devDependency Status][david-dm-dev-image]][david-dm-dev-url]

1. Fork it.
2. Create your feature-branch `git checkout -b your-new-feature-branch`
3. Commit your change `git commit -am 'Add new feature'`
4. Push to the branch `git push origin your-new-feature-branch`
5. Create new Pull Request with `master` branch

## License

The MIT License (MIT)

Copyright (c) 2017 Lee  < jessy1092@gmail.com >

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[npm-image]: https://img.shields.io/npm/v/valle.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/valle

[travis-ci-image]: https://img.shields.io/travis/jessy1092/valle.svg?style=flat-square
[travis-ci-url]: https://travis-ci.org/jessy1092/valle

[david-dm-image]: https://img.shields.io/david/jessy1092/valle.svg?style=flat-square
[david-dm-url]: https://david-dm.org/jessy1092/valle
[david-dm-dev-image]: https://img.shields.io/david/dev/jessy1092/valle.svg?style=flat-square
[david-dm-dev-url]: https://david-dm.org/jessy1092/valle#info=devDependencies

[coverage-status-image]: https://img.shields.io/coveralls/jessy1092/valle.svg?style=flat-square
[coverage-status-url]: https://coveralls.io/r/jessy1092/valle
