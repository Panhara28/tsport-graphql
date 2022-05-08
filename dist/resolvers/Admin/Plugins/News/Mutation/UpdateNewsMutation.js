"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateNewsMuation = void 0;

var _apolloServer = require("apollo-server");

const UpdateNewsMuation = async (_, {
  id,
  input,
  websiteId
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const isUpdated = await ctx.authUser.user.modified;

  if (isUpdated) {
    await knex.table('news').update({
      title: input.title,
      summary: input.summary,
      description: JSON.stringify(input.description),
      thumbnail: input.thumbnail ? input.thumbnail : '',
      new_category_id: input.new_category_id,
      updated_by: 1
    }).where({
      id
    }).andWhere('website_id', '=', websiteId);
    return true;
  } else {
    throw new _apolloServer.AuthenticationError(`You don't have permission!`);
  }
};

exports.UpdateNewsMuation = UpdateNewsMuation;