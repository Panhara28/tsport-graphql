"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentProvinceLoader = DocumentProvinceLoader;

var _dataloader = _interopRequireDefault(require("dataloader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DocumentProvinceLoader(ctx) {
  const knex = ctx.knex.default;
  return new _dataloader.default(async keys => {
    const result = await knex('documents').whereIn('province_id', keys).orderBy('id', 'desc');
    return keys.map(key => {
      return result.filter(x => x.province_id === key);
    });
  });
}