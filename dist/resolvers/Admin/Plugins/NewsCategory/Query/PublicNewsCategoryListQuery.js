"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicNewsCategoryListQuery = void 0;

const PublicNewsCategoryListQuery = async (_, {}, ctx) => {
  const knex = ctx.knex.default;
  const newsCategoryList = await knex.table('news_category').orderBy('id', 'desc').limit(8);
  return newsCategoryList.map(category => {
    return { ...category
    };
  });
};

exports.PublicNewsCategoryListQuery = PublicNewsCategoryListQuery;