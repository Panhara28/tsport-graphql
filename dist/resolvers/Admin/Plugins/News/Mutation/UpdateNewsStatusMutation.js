"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateNewsStatusMutation = void 0;

var _apolloServer = require("apollo-server");

const UpdateNewsStatusMutation = async (_, {
  id,
  status,
  websiteId
}, ctx) => {
  const knex = ctx.knex.default;
  const isUserCanUpdate = ctx.authUser.user.modified;

  if (isUserCanUpdate) {
    await knex.table('news').update({
      status
    }).where({
      id
    }).andWhere('website_id', '=', websiteId);
    return true;
  } else {
    throw new _apolloServer.AuthenticationError(`You don't have permission!`);
  }
};

exports.UpdateNewsStatusMutation = UpdateNewsStatusMutation;