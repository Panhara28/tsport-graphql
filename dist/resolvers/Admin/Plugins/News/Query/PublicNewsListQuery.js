"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicNewsListQuery = void 0;

var _newsCategoryLoader = require("../../../../../dataloader/newsCategoryLoader");

var _toKhmerFormat = require("../../../../../function/toKhmerFormat");

const PublicNewsListQuery = async (_, {
  filter,
  pagination
}, ctx) => {
  const knex = ctx.knex.default;
  const query = knex.table('news').orderBy('created_at', 'desc');

  if ((filter === null || filter === void 0 ? void 0 : filter.status) != undefined) {
    query.andWhere({
      status: filter.status
    });
  }

  if ((pagination === null || pagination === void 0 ? void 0 : pagination.page) != undefined || (pagination === null || pagination === void 0 ? void 0 : pagination.size) != undefined) {
    query.limit(pagination.size).offset(pagination.page);
  }

  const data = await query; // const newsCategories = await knex.table('news_category');

  const newsCategory = (0, _newsCategoryLoader.NewsCategoryLoader)(ctx);
  return data.map(item => {
    return { ...item,
      created_at: (0, _toKhmerFormat.toKhmerFormat)(item.created_at),
      category: () => newsCategory.load(item.new_category_id)
    };
  });
};

exports.PublicNewsListQuery = PublicNewsListQuery;