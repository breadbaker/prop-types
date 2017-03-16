Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = or;

var _react = require('react');

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function or(validators) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'or';

  if (!Array.isArray(validators)) {
    throw new TypeError('or: 2 or more validators are required');
  }
  if (validators.length <= 1) {
    throw new RangeError('or: 2 or more validators are required');
  }

  var validator = _react.PropTypes.oneOfType([_react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.oneOfType(validators))].concat(_toConsumableArray(validators)))]);

  return (0, _wrapValidator2['default'])(validator, name, validators);
}
//# sourceMappingURL=or.js.map