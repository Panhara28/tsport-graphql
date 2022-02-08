import ContextType from 'src/graphql/ContextType';

export const PluginManageAccessForUser = async (
  _,
  {
    websiteId,
    pluginId,
    userId,
    read,
    write,
    modified,
    remove,
  }: {
    websiteId: number;
    pluginId: number;
    userId: number;
    read: boolean;
    write: boolean;
    modified: boolean;
    remove: boolean;
  },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  const pluginManageAccessForUser = await knex
    .table('user_plugins')
    .update({ read, create: write, edit: modified, remove })
    .where('plugin_id', '=', pluginId)
    .andWhere('website_id', '=', websiteId)
    .andWhere('user_id', '=', userId);

  return pluginManageAccessForUser > 0;
};
