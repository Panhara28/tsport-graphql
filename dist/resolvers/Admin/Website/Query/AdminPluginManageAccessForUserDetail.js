"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminPluginManageAccessForUserQuery = void 0;

const AdminPluginManageAccessForUserQuery = async (_, {
  websiteId,
  pluginId,
  userId
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const access = await knex('user_plugins').where('website_id', '=', websiteId).andWhere('plugin_id', '=', pluginId).andWhere('user_id', '=', userId).first();
  return { ...access
  };
};

exports.AdminPluginManageAccessForUserQuery = AdminPluginManageAccessForUserQuery;