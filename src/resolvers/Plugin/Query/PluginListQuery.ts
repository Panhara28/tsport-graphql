import ContextType from 'src/graphql/ContextType';

export const PluginListQuery = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;
  await ctx.auth.requireLogin();

  const pluginList = await knex.table('plugins');

  return {
    data: pluginList.map(x => {
      return {
        ...x,
      };
    }),
  };
};
