"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductCommodityPriceLoader = ProductCommodityPriceLoader;

var _dataloader = _interopRequireDefault(require("dataloader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ProductCommodityPriceLoader(ctx) {
  const knex = ctx.knex.default;
  return new _dataloader.default(async keys => {
    const result = await knex('product_commodity_detail');
    return keys.map(key => result.find(x => x.commodity_price_id === key));
  });
}