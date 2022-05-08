"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginListQuery = void 0;

const PluginListQuery = async (_, {}, ctx) => {
  const knex = await ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');
  const pluginList = await knex.table('plugins');
  return {
    data: pluginList.filter(p => p.slug !== 'default').map(x => {
      return { ...x
      };
    })
  };
};

exports.PluginListQuery = PluginListQuery;