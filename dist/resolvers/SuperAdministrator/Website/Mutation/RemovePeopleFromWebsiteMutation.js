"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemovePeopleFromWebsiteMutation = void 0;

var _apolloServerErrors = require("apollo-server-errors");

const RemovePeopleFromWebsiteMutation = async (_, {
  userId,
  websiteId
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  if (!websiteId && !userId) {
    throw new _apolloServerErrors.AuthenticationError('Something went wrong');
  }

  const removePeople = await knex.table('website_user_details').del().where('website_user_details.user_id', '=', userId).andWhere('website_user_details.website_id', '=', websiteId);
  return removePeople;
};

exports.RemovePeopleFromWebsiteMutation = RemovePeopleFromWebsiteMutation;