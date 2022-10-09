import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server';
import moment from 'moment';
import Validation from 'src/function/validation';

export const AdminCreateUserMutation = async (_, { input }: { input: Graph.UserInput }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const admin_id = await ctx.authUser.user.id;

  const validation = new Validation(input);

  // validation.isRequired(['username', 'fullname', 'password', 'profile_picture', 'email'], 'is required');
  // validation.isValidEmail(['email']);

  if (validation.isError()) {
    validation.throwError();
  }

  const hash = bcrypt.hashSync(input?.password, 12);

  const [createUser] = await knex('users').insert({
    fullname: input?.fullname ? input?.fullname : undefined,
    username: input?.username ? input?.username : undefined,
    password: input?.password ? hash : undefined,
    profile_picture: input?.profile_picture,
    phone_number: input?.phoneNumber,
    email: input?.email,
  });

  if (createUser) {
    await knex('role_permissions').insert({
      user_id: createUser,
      role_id: 1,
    });

    await knex('activity_log').insert({
      user_id: admin_id,
      type: 'USER',
      activity: JSON.stringify(
        `{'activityType': 'create_user', 'user_id': '${createUser}', 'logged_at': '${moment().format(
          'DD-MM-YYYY HH:mm:ss',
        )}'}`,
      ),
    });

    return createUser;
  } else {
    throw new AuthenticationError(`You can't do that!`);
  }
};
