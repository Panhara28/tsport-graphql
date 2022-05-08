"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicNewsCateogryDetailQuery = void 0;

var _toKhmerFormat = require("../../../../../function/toKhmerFormat");

const PublicNewsCateogryDetailQuery = async (_, {
  id
}, ctx) => {
  const knex = ctx.knex.default;
  const newsCategory = await knex.table('news_category').where({
    id
  }).first();
  const news = await knex.table('news').where({
    new_category_id: newsCategory.id
  });
  return { ...newsCategory,
    news: news.map(item => {
      return { ...item,
        created_at: (0, _toKhmerFormat.toKhmerFormat)(item.created_at)
      };
    })
  };
};

exports.PublicNewsCateogryDetailQuery = PublicNewsCateogryDetailQuery;