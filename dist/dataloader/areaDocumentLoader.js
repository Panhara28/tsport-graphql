"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaDocumentLoader = AreaDocumentLoader;

var _dataloader = _interopRequireDefault(require("dataloader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AreaDocumentLoader(ctx) {
  const knex = ctx.knex.default;
  return new _dataloader.default(async keys => {
    const result = await knex('special_economic_zone');
    return keys.map(key => result.find(x => x.id === key));
  });
}