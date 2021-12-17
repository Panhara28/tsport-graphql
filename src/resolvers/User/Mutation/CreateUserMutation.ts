import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateUserMutation = async (_, { input }: { input: Graph.UserInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const createUser = await knex.table('users').insert({
    username: input.username,
    password: input.password,
    fullname: input.fullname,
    website_id: input.website_id,
  });

  return createUser[0];
};
