import ContextType from 'src/graphql/ContextType';

export const UninstallPluginToWebsiteMutation = async (
  _,
  { websiteId, pluginId }: { websiteId: number; pluginId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await knex
    .table('website_plugins')
    .del()
    .where('website_plugins.website_id', '=', websiteId)
    .andWhere('website_plugins.plugin_id', '=', pluginId);

  return true;
};
