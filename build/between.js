Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports['default'] = betweenValidator;

var _react = require('react');

var _object = require('object.entries');

var _object2 = _interopRequireDefault(_object);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (!Object.entries) {
  _object2['default'].shim();
}

function number(props, propName, componentName) {
  var value = props[propName];
  if (typeof value === 'number' && !isNaN(value)) {
    return null;
  }

  return new TypeError(String(componentName) + ': ' + String(propName) + ' must be a non-NaN number.');
}

function numberOrPropsFunc(props, propName) {
  var value = props[propName];

  if (typeof value === 'function') {
    return null;
  }

  if (typeof value === 'number' && !isNaN(value)) {
    return null;
  }

  return new TypeError(String(propName) + ': a function, or a non-NaN number is required');
}

function lowerCompare(value, _ref) {
  var gt = _ref.gt,
      gte = _ref.gte;

  if (typeof gt === 'number') {
    return value > gt;
  }
  if (typeof gte === 'number') {
    return value >= gte;
  }
  return true;
}

function upperCompare(value, _ref2) {
  var lt = _ref2.lt,
      lte = _ref2.lte;

  if (typeof lt === 'number') {
    return value < lt;
  }
  if (typeof lte === 'number') {
    return value <= lte;
  }
  return true;
}

function greaterThanError(_ref3) {
  var gt = _ref3.gt,
      gte = _ref3.gte;

  if (typeof gt === 'number') {
    return 'greater than ' + gt;
  }
  if (typeof gte === 'number') {
    return 'greater than or equal to ' + gte;
  }
  return '';
}

function lessThanError(_ref4) {
  var lt = _ref4.lt,
      lte = _ref4.lte;

  if (typeof lt === 'number') {
    return 'less than ' + lt;
  }
  if (typeof lte === 'number') {
    return 'less than or equal to ' + lte;
  }
  return '';
}

function errorMessage(componentName, propName, opts) {
  var errors = [greaterThanError(opts), lessThanError(opts)].filter(Boolean).join(' and ');
  return String(componentName) + ': ' + String(propName) + ' must be ' + String(errors);
}

function propsThunkify(opts) {
  return Object.entries(opts).reduce(function (acc, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        value = _ref6[1];

    var numberThunk = typeof value === 'number' ? function () {
      return value;
    } : value;
    return Object.assign({}, acc, _defineProperty({}, key, numberThunk));
  }, {});
}

function invokeWithProps(optsThunks, props) {
  return Object.entries(optsThunks).reduce(function (acc, _ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        thunk = _ref8[1];

    var value = thunk(props);
    return Object.assign({}, acc, _defineProperty({}, key, value));
  }, {});
}

var argValidators = [(0, _shape2['default'])({ lt: numberOrPropsFunc, gt: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ lte: numberOrPropsFunc, gt: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ lt: numberOrPropsFunc, gte: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ lte: numberOrPropsFunc, gte: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ lt: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ lte: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ gt: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ gte: numberOrPropsFunc }).isRequired];
function argValidator(props, propName) {
  return argValidators.every(function (validator) {
    return !!validator(props, propName);
  });
}

var thunkValueValidator = _react.PropTypes.objectOf(number).isRequired;

function betweenValidator(options) {
  var argError = argValidator({ options: options }, 'options');
  if (argError) {
    throw new TypeError('between: only one of the pairs of `lt`/`lte`, and `gt`/`gte`, may be supplied, and at least one pair must be provided.');
  }

  var optsThunks = propsThunkify(options);

  var validator = function () {
    function between(props, propName, componentName) {
      var propValue = props[propName];
      if (propValue == null) {
        return null;
      }

      if (typeof propValue !== 'number') {
        return new RangeError(String(componentName) + ': ' + String(propName) + ' must be a number, got "' + (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) + '"');
      }

      var opts = invokeWithProps(optsThunks, props);

      for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        rest[_key - 3] = arguments[_key];
      }

      var thunkValuesError = thunkValueValidator.apply(undefined, [_defineProperty({}, propName, opts), propName, componentName].concat(rest));
      if (thunkValuesError) {
        return thunkValuesError;
      }

      if (!lowerCompare(propValue, opts) || !upperCompare(propValue, opts)) {
        return new RangeError(errorMessage(componentName, propName, opts));
      }

      return null;
    }

    return between;
  }();
  validator.isRequired = function () {
    function betweenRequired(props, propName, componentName) {
      var propValue = props[propName];
      if (typeof propValue !== 'number') {
        return new RangeError(String(componentName) + ': ' + String(propName) + ' must be a number, got "' + (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) + '"');
      }

      var opts = invokeWithProps(optsThunks, props);

      for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        rest[_key2 - 3] = arguments[_key2];
      }

      var thunkValuesError = thunkValueValidator.apply(undefined, [_defineProperty({}, propName, opts), propName, componentName].concat(rest));
      if (thunkValuesError) {
        return thunkValuesError;
      }

      if (!lowerCompare(propValue, opts) || !upperCompare(propValue, opts)) {
        return new RangeError(errorMessage(componentName, propName, opts));
      }

      return null;
    }

    return betweenRequired;
  }();

  return (0, _wrapValidator2['default'])(validator, 'between', options);
}
//# sourceMappingURL=between.js.map