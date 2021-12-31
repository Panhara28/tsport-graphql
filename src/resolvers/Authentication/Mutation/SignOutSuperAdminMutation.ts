import ContextType from '../../../graphql/ContextType';
import moment from 'moment';

export const SignOutSuperAdminMutation = async (_, { token }: { token: string }, ctx: ContextType) => {
  const knex = ctx.knex.default;

  await knex
    .table('user_token')
    .where({ token })
    .del();

  return true;
};
