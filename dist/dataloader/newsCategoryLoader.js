"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsCategoryLoader = NewsCategoryLoader;

var _dataloader = _interopRequireDefault(require("dataloader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NewsCategoryLoader(ctx) {
  const knex = ctx.knex.default;
  return new _dataloader.default(async keys => {
    const result = await knex('news_category');
    return keys.map(key => result.find(x => x.id === key));
  });
}