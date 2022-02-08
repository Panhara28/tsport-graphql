import ContextType from 'src/graphql/ContextType';

export const PluginManageAccessForUserQuery = async (
  _,
  { websiteId, pluginId, userId }: { websiteId: number; pluginId: number; userId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  const access = await knex('user_plugins')
    .where('website_id', '=', websiteId)
    .andWhere('plugin_id', '=', pluginId)
    .andWhere('user_id', '=', userId)
    .first();

  return {
    ...access,
  };
};
