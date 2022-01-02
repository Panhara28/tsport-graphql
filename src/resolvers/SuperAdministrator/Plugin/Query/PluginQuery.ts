import ContextType from 'src/graphql/ContextType';

export const PluginQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  const plugin = await knex
    .table('plugins')
    .where({ id })
    .first();

  return {
    ...plugin,
  };
};
