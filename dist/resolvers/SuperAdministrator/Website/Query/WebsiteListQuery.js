"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebsiteListQuery = void 0;

const WebsiteListQuery = async (_, {}, ctx) => {
  const knex = await ctx.knex.default;
  const websiteList = await knex.table('websites');
  return {
    data: websiteList.map(x => {
      return { ...x
      };
    })
  };
};

exports.WebsiteListQuery = WebsiteListQuery;