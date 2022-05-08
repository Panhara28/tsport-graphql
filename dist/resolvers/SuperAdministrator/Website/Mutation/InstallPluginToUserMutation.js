"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstallPluginToUserMutation = void 0;

var _apolloServer = require("apollo-server");

const InstallPluginToUserMutation = async (_, {
  websiteId,
  pluginId,
  userId
}, ctx) => {
  const knex = ctx.knex.default;
  const checkIfThePluginExisted = await knex.table('user_plugins').where('plugin_id', '=', pluginId).andWhere('user_id', '=', userId).andWhere('website_id', '=', websiteId).first();

  if (checkIfThePluginExisted) {
    throw new _apolloServer.AuthenticationError('Plugin Already Existed');
  }

  await knex.table('user_plugins').insert({
    website_id: websiteId,
    plugin_id: pluginId,
    user_id: userId
  });
  return true;
};

exports.InstallPluginToUserMutation = InstallPluginToUserMutation;