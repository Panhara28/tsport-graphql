"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicNewsDetailQuery = void 0;

var _newsCategoryLoader = require("../../../../../dataloader/newsCategoryLoader");

var _toKhmerFormat = require("../../../../../function/toKhmerFormat");

const PublicNewsDetailQuery = async (_, {
  id
}, ctx) => {
  const knex = ctx.knex.default;
  const newsDetail = await knex.table('news').where({
    id
  }).first();
  const newsCategory = (0, _newsCategoryLoader.NewsCategoryLoader)(ctx);
  return { ...newsDetail,
    created_at: (0, _toKhmerFormat.toKhmerFormat)(newsDetail.created_at),
    category: () => newsCategory.load(newsDetail.new_category_id)
  };
};

exports.PublicNewsDetailQuery = PublicNewsDetailQuery;