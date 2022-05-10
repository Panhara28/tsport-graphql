"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentLoader = DocumentLoader;

var _dataloader = _interopRequireDefault(require("dataloader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DocumentLoader(ctx) {
  const knex = ctx.knex.default;
  return new _dataloader.default(async keys => {
    const result = await knex('documents').whereIn('document_category_id', keys);
    return keys.map(key => result.filter(x => x.document_category_id === key));
  });
}