"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toKhmerFormat = toKhmerFormat;

var _DateHelper = _interopRequireDefault(require("./DateHelper"));

var _DayNumberToKhmerNumber = require("./DayNumberToKhmerNumber");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toKhmerFormat(s) {
  const date = _DateHelper.default.getNowDate(s, 'M/DD/YYYY');

  const getDay = date.split('/')[1];
  const getMonth = date.split('/')[0];
  const getYear = date.split('/')[2];
  const toKhmerdate = (0, _DayNumberToKhmerNumber.toKhmerNumber)(getDay, getMonth, getYear);
  return toKhmerdate;
}