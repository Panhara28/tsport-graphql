import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server';

export const CreateUserMutation = async (_, { input }: { input: Graph.UserInput }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');
  const hash = bcrypt.hashSync(input.password, 12);

  const [createUser] = await knex('users').insert({
    fullname: input?.fullname ? input?.fullname : undefined,
    username: input?.username ? input?.username : undefined,
    password: input?.password ? hash : undefined,
  });

  if (createUser) {
    await knex('role_permissions').insert({
      user_id: createUser,
      role_id: 1,
    });
    return createUser;
  } else {
    throw new AuthenticationError(`You can't do that!`);
  }
};
