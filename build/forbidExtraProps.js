Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = forbidExtraProps;

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

var _isPlainObject = require('./helpers/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var zeroWidthSpace = '\u200B';
var semaphore = {};

function brand(fn) {
  return Object.assign(fn, _defineProperty({}, zeroWidthSpace, semaphore));
}

function isBranded(value) {
  return value && value[zeroWidthSpace] === semaphore;
}

function forbidExtraProps(propTypes) {
  if (!(0, _isPlainObject2['default'])(propTypes)) {
    throw new TypeError('given propTypes must be an object');
  }
  if ((0, _has2['default'])(propTypes, zeroWidthSpace) && !isBranded(propTypes[zeroWidthSpace])) {
    throw new TypeError('Against all odds, you created a propType for a prop named after the zero-width space - which, sadly, conflicts with `forbidExtraProps`');
  }

  return Object.assign({}, propTypes, _defineProperty({}, zeroWidthSpace, brand(function () {
    function forbidUnknownProps(props, _, componentName) {
      var unknownProps = Object.keys(props).filter(function (prop) {
        return !(0, _has2['default'])(propTypes, prop);
      });
      if (unknownProps.length > 0) {
        return new TypeError(String(componentName) + ': unknown props found: ' + String(unknownProps.join(', ')));
      }
      return null;
    }

    return forbidUnknownProps;
  }())));
}
//# sourceMappingURL=forbidExtraProps.js.map