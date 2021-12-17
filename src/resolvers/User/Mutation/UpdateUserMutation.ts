import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateUserMutation = async (
  _,
  { id, input }: { id: number; input: Graph.UserInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const updateUser = await knex.table('users').update({
    username: input.username,
    password: input.password,
    fullname: input.fullname,
    website_id: input.website_id,
  });

  return updateUser > 0;
};
