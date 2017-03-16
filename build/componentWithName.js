Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getComponentName = require('./helpers/getComponentName');

var _getComponentName2 = _interopRequireDefault(_getComponentName);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function hasName(name, prop, propName, componentName) {
  if (Array.isArray(prop)) {
    return prop.map(function (item) {
      return hasName(name, item, propName, componentName);
    }).find(Boolean) || null;
  }

  if (!_react2['default'].isValidElement(prop)) {
    return new TypeError(String(componentName) + '.' + String(propName) + ' is not a valid React element');
  }

  var type = prop.type;

  if ((0, _getComponentName2['default'])(type) !== name) {
    return new TypeError('`' + String(componentName) + '.' + String(propName) + '` only accepts components named ' + String(name));
  }

  return null;
}

function componentWithName(name) {
  function componentWithNameValidator(props, propName, componentName) {
    var prop = props[propName];
    if (props[propName] == null) {
      return null;
    }
    return hasName(name, prop, propName, componentName);
  }

  componentWithNameValidator.isRequired = function () {
    function componentWithNameRequired(props, propName, componentName) {
      var prop = props[propName];
      if (prop == null) {
        return new TypeError('`' + String(componentName) + '.' + String(propName) + '` requires at least one component named ' + String(name));
      }
      return hasName(name, prop, propName, componentName);
    }

    return componentWithNameRequired;
  }();

  return (0, _wrapValidator2['default'])(componentWithNameValidator, 'componentWithName:' + String(name), name);
}

exports['default'] = componentWithName;
//# sourceMappingURL=componentWithName.js.map