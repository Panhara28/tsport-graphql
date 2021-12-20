"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddPluginToWebsiteMutation = void 0;

var _apolloServer = require("apollo-server");

const AddPluginToWebsiteMutation = async (_, {
  websiteId,
  input
}, ctx) => {
  const knex = ctx.knex.default;
  const checkIfThePluginExisted = await knex.table('website_plugins').where('plugin_id', '=', input.pluginId).first();

  if (checkIfThePluginExisted) {
    throw new _apolloServer.AuthenticationError('Plugin Already Existed');
  }

  await knex.table('website_plugins').insert({
    website_id: websiteId,
    plugin_id: input.pluginId,
    isInstalled: 'INSTALLED'
  });
  return true;
};

exports.AddPluginToWebsiteMutation = AddPluginToWebsiteMutation;