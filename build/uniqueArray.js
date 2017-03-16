Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function requiredUniqueArray(props, propName, componentName) {
  var _PropTypes$array;

  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var result = (_PropTypes$array = _react.PropTypes.array).isRequired.apply(_PropTypes$array, [props, propName, componentName].concat(rest));
  if (result != null) {
    return result;
  }

  var array = props[propName];
  var uniqueCount = new Set(array).size;
  if (uniqueCount !== array.length) {
    return new RangeError(String(componentName) + ': values must be unique. ' + (array.length - uniqueCount) + ' duplicate values found.');
  }
  return null;
}

function uniqueArray(props, propName) {
  var array = props[propName];
  if (array == null) {
    return null;
  }

  for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    rest[_key2 - 2] = arguments[_key2];
  }

  return requiredUniqueArray.apply(undefined, [props, propName].concat(rest));
}
uniqueArray.isRequired = requiredUniqueArray;

exports['default'] = function () {
  return (0, _wrapValidator2['default'])(uniqueArray, 'uniqueArray');
};
//# sourceMappingURL=uniqueArray.js.map