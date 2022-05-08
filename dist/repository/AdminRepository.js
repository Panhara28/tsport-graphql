"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseRepository = _interopRequireDefault(require("./BaseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AdminRepository extends _BaseRepository.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "tableName", "users");

    _defineProperty(this, "idColumnName", "id");
  }

  static map(row) {
    return {
      id: row.id,
      fullname: row.fullname,
      username: row.username,
      password: row.password,
      profile: row.profile,
      status: row.status,
      phoneNumber: row.phoneNumber,
      email: row.email
    };
  }

}

exports.default = AdminRepository;