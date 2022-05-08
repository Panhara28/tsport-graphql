"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddPeopleToWebsiteMutation = void 0;

var _apolloServer = require("apollo-server");

const AddPeopleToWebsiteMutation = async (_, {
  websiteId,
  input
}, ctx) => {
  const knex = ctx.knex.default; // await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  await ctx.authUser.requireLogin('USER');
  const checkIfThePeopleExisted = await knex.table('website_user_details').whereIn('user_id', input.map(item => item.userId)).andWhere({
    website_id: websiteId
  });

  if (checkIfThePeopleExisted.length > 0) {
    throw new _apolloServer.AuthenticationError('User Already Existed');
  } else {
    input.map(async item => {
      await knex.table('website_user_details').insert({
        user_id: item.userId,
        website_id: websiteId
      });
    });
  }

  if (checkIfThePeopleExisted.length > 0) {
    throw new _apolloServer.AuthenticationError('User Already Existed');
  } else {
    return true;
  }
};

exports.AddPeopleToWebsiteMutation = AddPeopleToWebsiteMutation;