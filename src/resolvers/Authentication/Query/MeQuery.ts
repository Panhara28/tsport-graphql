import ContextType from '../../../graphql/ContextType';

export const MeQuery = async (_, {}, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const token = ctx.token;

  if (token) {
    const user = await knex
      .table('user_token')
      .innerJoin('super_admin', 'super_admin.id', 'user_token.super_admin_id')
      .select('super_admin.id', 'super_admin.fullname')
      .where({ token })
      .first();

    return {
      ...user,
    };
  }

  return null;
};
