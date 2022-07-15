import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server';

export const AdminCreateUserMutation = async (_, { input }: { input: Graph.UserInput }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const hash = bcrypt.hashSync(input.password, 12);

  const [createUser] = await knex('users').insert({
    fullname: input?.fullname ? input?.fullname : undefined,
    username: input?.username ? input?.username : undefined,
    password: input?.password ? hash : undefined,
    profile_picture: input?.profile_picture,
  });

  if (createUser) {
    await knex('role_permissions').insert({
      user_id: createUser,
      role_id: 1,
    });

    await knex('user_plugins').insert({
      user_id: createUser,
      plugin_id: 1,
      read: 1,
    });
    return createUser;
  } else {
    throw new AuthenticationError(`You can't do that!`);
  }
};
