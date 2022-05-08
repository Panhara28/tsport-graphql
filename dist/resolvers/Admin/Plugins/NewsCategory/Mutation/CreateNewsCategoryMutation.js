"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateNewsCategoryMutation = void 0;

const CreateNewsCategoryMutation = async (_, {
  input
}, ctx) => {
  const knex = ctx.knex.default;
  const addNewsCategory = await knex.table('news_category').insert({
    name: input.name,
    created_by: 1
  });
  return addNewsCategory[0];
};

exports.CreateNewsCategoryMutation = CreateNewsCategoryMutation;