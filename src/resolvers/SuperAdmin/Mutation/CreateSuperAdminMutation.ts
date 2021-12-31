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
<<<<<<< HEAD
    website_id: input.website_id,
=======
>>>>>>> 8db3400dddd77a4b634b2f76fa7217d8413aaa9c
  });

  return createUser[0];
};
