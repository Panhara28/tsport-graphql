import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateSuperAdminMutation = async (
  _,
  { id, input }: { id: number; input: Graph.SuperAdminInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  await ctx.auth.requireLogin();

  const updateUser = await knex.table('users').update({
    username: input.username,
    password: input.password,
    fullname: input.fullname,
  });

  return updateUser > 0;
};
