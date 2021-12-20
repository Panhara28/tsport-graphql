"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UninstallPluginToWebsiteMutation = void 0;

const UninstallPluginToWebsiteMutation = async (_, {
  websiteId,
  pluginId
}, ctx) => {
  const knex = ctx.knex.default;
  await knex.table('website_plugins').del().where('website_plugins.website_id', '=', websiteId).andWhere('website_plugins.plugin_id', '=', pluginId);
  return true;
};

exports.UninstallPluginToWebsiteMutation = UninstallPluginToWebsiteMutation;