"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdatePluginMutation = void 0;

const UpdatePluginMutation = async (_, {
  id,
  input
}, ctx) => {
  const knex = await ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');
  const updatePlugin = await knex.table('plugins').update({
    name: input.name,
    website_id: input.website_id
  }).where({
    id
  });
  return updatePlugin > 0;
};

exports.UpdatePluginMutation = UpdatePluginMutation;