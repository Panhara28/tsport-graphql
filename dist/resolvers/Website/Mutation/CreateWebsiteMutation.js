"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateWebsiteMutation = void 0;

const CreateWebsiteMutation = async (_, {
  input
}, ctx) => {
  const knex = await ctx.knex.default;
  const createWebsite = await knex.table('websites').insert({
    name: input.name,
    description: input.description
  });
  return createWebsite[0];
};

exports.CreateWebsiteMutation = CreateWebsiteMutation;