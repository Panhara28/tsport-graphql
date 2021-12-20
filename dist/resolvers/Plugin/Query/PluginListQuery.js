"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginListQuery = void 0;

const PluginListQuery = async (_, {}, ctx) => {
  const knex = await ctx.knex.default;
  const pluginList = await knex.table('plugins');
  return {
    data: pluginList.map(x => {
      return { ...x
      };
    })
  };
};

exports.PluginListQuery = PluginListQuery;