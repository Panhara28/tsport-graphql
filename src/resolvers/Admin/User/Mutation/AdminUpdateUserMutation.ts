import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const AdminUpdateUserMutation = async (
  _,
  { id, input }: { id: number; input: Graph.UserInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');

  const updateUser = await knex('users')
    .update({
      fullname: input?.fullname ? input?.fullname : undefined,
      username: input?.username ? input?.username : undefined,
      profile_picture: input?.profile_picture,
    })
    .where({ id });

  return updateUser > 0;
};
