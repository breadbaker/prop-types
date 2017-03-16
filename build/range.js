Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = range;

var _and = require('./and');

var _and2 = _interopRequireDefault(_and);

var _between = require('./between');

var _between2 = _interopRequireDefault(_between);

var _integer = require('./integer');

var _integer2 = _interopRequireDefault(_integer);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isValidLength(x) {
  return Number.isInteger(x) && isFinite(x) && Math.abs(x) < Number.MAX_SAFE_INTEGER;
}

function range(min, max) {
  if (!isValidLength(min) || !isValidLength(max)) {
    throw new RangeError('"range" requires two integers');
  }
  if (min === max) {
    throw new RangeError('min and max must not be the same');
  }
  return (0, _wrapValidator2['default'])((0, _and2['default'])([(0, _integer2['default'])(), (0, _between2['default'])({ gte: min, lt: max })], 'range'), 'range', { min: min, max: max });
}
//# sourceMappingURL=range.js.map