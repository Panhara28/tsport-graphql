"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginManageAccessForUserQuery = void 0;

const PluginManageAccessForUserQuery = async (_, {
  websiteId,
  pluginId,
  userId
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');
  const access = await knex('user_plugins').where('website_id', '=', websiteId).andWhere('plugin_id', '=', pluginId).andWhere('user_id', '=', userId).first();
  return { ...access
  };
};

exports.PluginManageAccessForUserQuery = PluginManageAccessForUserQuery;