"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePluginMutation = void 0;

const CreatePluginMutation = async (_, {
  input
}, ctx) => {
  const knex = await ctx.knex.default;
  const createPlugin = await knex.table('plugins').insert({
    name: input.name,
    website_id: input.website_id
  });
  return createPlugin[0];
};

exports.CreatePluginMutation = CreatePluginMutation;