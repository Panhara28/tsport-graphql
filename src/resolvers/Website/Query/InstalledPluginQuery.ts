import ContextType from 'src/graphql/ContextType';

export const InstalledPluginQuery = async (_, { websiteId }: { websiteId: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;

  const installedPlugins = await knex
    .table('websites')
    .innerJoin('website_plugins', 'websites.id', 'website_plugins.website_id')
    .innerJoin('plugins', 'plugins.id', 'website_plugins.plugin_id')
    .select('plugins.id as pluginId', 'plugins.name as pluginName')
    .where('websites.id', '=', websiteId)
    .andWhere('website_plugins.isInstalled', '=', 'INSTALLED');

  return installedPlugins.map(item => {
    return {
      ...item,
      pluginId: item.pluginId,
      pluginName: item.pluginName,
    };
  });
};
