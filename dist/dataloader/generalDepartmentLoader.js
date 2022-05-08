"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeneralDepartmentLoader = void 0;

var _dataloader = _interopRequireDefault(require("dataloader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GeneralDepartmentLoader = ctx => {
  const knex = ctx.knex.default;
  return new _dataloader.default(async keys => {
    const result = await knex.table('departments').whereIn('general_department_id', keys);
    return keys.map(key => result.filter(x => x.general_department_id === key));
  });
};

exports.GeneralDepartmentLoader = GeneralDepartmentLoader;