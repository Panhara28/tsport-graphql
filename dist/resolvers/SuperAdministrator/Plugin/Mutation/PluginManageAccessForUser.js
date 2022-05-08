"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginManageAccessForUser = void 0;

const PluginManageAccessForUser = async (_, {
  websiteId,
  pluginId,
  userId,
  read,
  write,
  modified,
  remove
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');
  const pluginManageAccessForUser = await knex.table('user_plugins').update({
    read,
    create: write,
    edit: modified,
    remove
  }).where('plugin_id', '=', pluginId).andWhere('website_id', '=', websiteId).andWhere('user_id', '=', userId);
  return pluginManageAccessForUser > 0;
};

exports.PluginManageAccessForUser = PluginManageAccessForUser;