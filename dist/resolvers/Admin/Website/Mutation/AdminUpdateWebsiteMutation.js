"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminUpdateWebsiteMutation = void 0;

const AdminUpdateWebsiteMutation = async (_, {
  id,
  input
}, ctx) => {
  const knex = await ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('USER');
  const updateWebsite = await knex.table('websites').update({
    name: input.name,
    description: input.description
  }).where({
    id
  });
  return updateWebsite > 0;
};

exports.AdminUpdateWebsiteMutation = AdminUpdateWebsiteMutation;