"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsDetailQuery = void 0;

var _apolloServer = require("apollo-server");

const NewsDetailQuery = async (_, {
  id,
  websiteId
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const isRead = await ctx.authUser.user.read;

  if (isRead) {
    const newsDetail = await knex.table('news').where({
      id
    }).andWhere('website_id', '=', websiteId).first();
    return { ...newsDetail,
      description: newsDetail.description ? newsDetail.description : undefined
    };
  } else {
    throw new _apolloServer.AuthenticationError(`You don't have permission`);
  }
};

exports.NewsDetailQuery = NewsDetailQuery;