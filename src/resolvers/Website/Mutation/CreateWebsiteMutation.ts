import { AuthenticationError } from 'apollo-server-errors';
import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateWebsiteMutation = async (_, { input }: { input: Graph.WebsiteInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const isLogin = await ctx.superAdmin.requireLogin();

  if (isLogin) {
    const createWebsite = await knex.table('websites').insert({
      name: input.name,
      description: input.description,
    });
    return createWebsite[0];
  } else {
    throw new AuthenticationError('You need to sign in');
  }
};
