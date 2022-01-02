import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateWebsiteMutation = async (
  _,
  { id, input }: { id: number; input: Graph.WebsiteInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  const updateWebsite = await knex
    .table('websites')
    .update({
      name: input.name,
      description: input.description,
    })
    .where({ id });

  return updateWebsite > 0;
};
