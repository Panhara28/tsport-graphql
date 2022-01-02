import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateWebsiteMutation = async (_, { input }: { input: Graph.WebsiteInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin();
  const createWebsite = await knex.table('websites').insert({
    name: input.name,
    description: input.description,
  });

  return createWebsite[0];
};
