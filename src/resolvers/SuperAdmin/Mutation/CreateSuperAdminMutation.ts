import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import bcrypt from 'bcryptjs';

export const CreateSuperAdminMutation = async (_, { input }: { input: Graph.SuperAdminInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;
  const hash = bcrypt.hashSync(input.password, 12);

  const createUser = await knex.table('super_admin').insert({
    username: input.username,
    password: hash,
    fullname: input.fullname,
  });

  return createUser[0];
};
