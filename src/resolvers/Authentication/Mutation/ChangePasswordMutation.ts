import ContextType from '../../../graphql/ContextType';
import bcrypt from 'bcryptjs';

export const ChangePasswordMutation = async (_, { password }: { password: string }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const admin_id = await ctx.authUser.user.id;

  const hash = bcrypt.hashSync(password, 12);

  const changePassword = await knex
    .table('users')
    .update({ password: hash })
    .where({ id: admin_id });

  return changePassword > 0;
};
