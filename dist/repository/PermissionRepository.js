"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseRepository = _interopRequireDefault(require("./BaseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PermissionRepository extends _BaseRepository.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "tableName", "roles");

    _defineProperty(this, "idColumnName", "id");
  }

  static map(row) {
    return {
      id: row.id,
      name: row.name,
      description: row.description
    };
  }

}

exports.default = PermissionRepository;