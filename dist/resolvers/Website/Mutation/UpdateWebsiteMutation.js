"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateWebsiteMutation = void 0;

const UpdateWebsiteMutation = async (_, {
  id,
  input
}, ctx) => {
  const knex = await ctx.knex.default;
  const updateWebsite = await knex.table('websites').update({
    name: input.name,
    description: input.description
  }).where({
    id
  });
  return updateWebsite > 0;
};

exports.UpdateWebsiteMutation = UpdateWebsiteMutation;