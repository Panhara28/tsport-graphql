"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebsiteQuery = void 0;

const WebsiteQuery = async (_, {
  id
}, ctx) => {
  const knex = await ctx.knex.default;
  const website = await knex.table('websites').where({
    id
  }).first();
  return { ...website
  };
};

exports.WebsiteQuery = WebsiteQuery;