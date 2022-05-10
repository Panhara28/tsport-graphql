"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsCategoryListQuery = void 0;

const NewsCategoryListQuery = async (_, {}, ctx) => {
  const knex = ctx.knex.default;
  const newsCategoryList = await knex.table('news_category').orderBy('id', 'desc');
  return newsCategoryList.map(category => {
    return { ...category
    };
  });
};

exports.NewsCategoryListQuery = NewsCategoryListQuery;