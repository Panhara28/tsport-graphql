"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createKnexContex;

var _knex = _interopRequireDefault(require("knex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createKnexContex() {
  return {
    default: (0, _knex.default)({
      client: 'mysql2',
      connection: process.env.MYSQL_DEFAULT,
      pool: {
        min: 3,
        max: 10
      }
    })
  };
}