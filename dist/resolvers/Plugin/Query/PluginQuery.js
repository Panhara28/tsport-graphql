"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginQuery = void 0;

const PluginQuery = async (_, {
  id
}, ctx) => {
  const knex = await ctx.knex.default;
  const plugin = await knex.table('plugins').where({
    id
  }).first();
  return { ...plugin
  };
};

exports.PluginQuery = PluginQuery;