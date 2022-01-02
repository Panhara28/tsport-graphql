import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdatePluginMutation = async (
  _,
  { id, input }: { id: number; input: Graph.PluginInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  const updatePlugin = await knex
    .table('plugins')
    .update({
      name: input.name,
      website_id: input.website_id,
    })
    .where({ id });

  return updatePlugin > 0;
};
