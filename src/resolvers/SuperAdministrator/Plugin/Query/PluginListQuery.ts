import ContextType from 'src/graphql/ContextType';

export const PluginListQuery = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  const pluginList = await knex.table('plugins');

  return {
    data: pluginList
      .filter(p => p.slug !== 'default')
      .map(x => {
        return {
          ...x,
        };
      }),
  };
};
