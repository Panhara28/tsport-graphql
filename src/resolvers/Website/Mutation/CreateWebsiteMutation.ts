import { AuthenticationError } from 'apollo-server-errors';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateWebsiteMutation = async (_, { input }: { input: Graph.WebsiteInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  await ctx.auth.requirePermission(['Administrator']);
  const isCreated = await ctx.auth.admin.isCreated;

  if (!isCreated) {
    throw new AuthenticationError("You don't have permission");
  } else {
    const createWebsite = await knex.table('websites').insert({
      name: input.name,
      description: input.description,
    });

    return createWebsite[0];
  }
};
