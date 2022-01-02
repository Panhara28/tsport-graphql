import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreatePluginMutation = async (_, { input }: { input: Graph.PluginInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  const createPlugin = await knex.table('plugins').insert({
    name: input.name,
    website_id: input.website_id,
  });

  return createPlugin[0];
};
