"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateNewsCategoryMutation = void 0;

const UpdateNewsCategoryMutation = async (_, {
  id,
  input
}, ctx) => {
  const knex = ctx.knex.default;
  const updateNewsCategory = await knex.table('news_category').update({
    name: input.name
  }).where({
    id
  });
  return updateNewsCategory > 0;
};

exports.UpdateNewsCategoryMutation = UpdateNewsCategoryMutation;