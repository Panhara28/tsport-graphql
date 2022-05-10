"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsCateogryDetailQuery = void 0;

const NewsCateogryDetailQuery = async (_, {
  id
}, ctx) => {
  const knex = ctx.knex.default;
  const newsCategory = await knex.table('news_category').where({
    id
  }).first();
  return { ...newsCategory
  };
};

exports.NewsCateogryDetailQuery = NewsCateogryDetailQuery;