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
      phoneNumber: input?.phoneNumber ? input?.phoneNumber : undefined,
      email: input?.email ? input?.email : undefined,
      profile_picture: input?.profile_picture ? input?.profile_picture : undefined,
    })
    .where({ id });

  return updateUser > 0;
};
