import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const AdminUpdateWebsiteMutation = async (
  _,
  { id, input }: { id: number; input: Graph.WebsiteInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  await ctx.authUser.requireLogin('USER');

  const updateWebsite = await knex
    .table('websites')
    .update({
      name: input.name,
      description: input.description,
    })
    .where({ id });

  return updateWebsite > 0;
};
