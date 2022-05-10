"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductCategoryListLoader = ProductCategoryListLoader;

var _dataloader = _interopRequireDefault(require("dataloader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ProductCategoryListLoader(ctx) {
  const knex = ctx.knex.default;
  return new _dataloader.default(async keys => {
    const result = await knex('products').whereIn('product_category_id', keys);
    return keys.map(key => result.filter(x => x.product_category_id === key));
  });
}