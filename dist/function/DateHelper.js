"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DateHelper {
  static getNowDate(date, format) {
    return (0, _momentTimezone.default)(date).tz('Asia/Phnom_Penh').format(format);
  }

  static getNowDateTime() {
    return (0, _momentTimezone.default)().tz('Asia/Phnom_Penh').format('YYYY-MM-DD HH:mm:ss');
  }

  static convertDateTimetoDate(date) {
    return (0, _momentTimezone.default)(date).tz('Asia/Phnom_Penh').format('YYYY-MM-DD');
  }

}

exports.default = DateHelper;