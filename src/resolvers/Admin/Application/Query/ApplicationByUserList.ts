import ContextType from 'src/graphql/ContextType';

export const ApplicationByUserList = async (_, {}, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const user_id = ctx.authUser.user.id;
  const applications = await knex
    .table('users')
    .innerJoin('website_user_details', 'website_user_details.user_id', 'users.id')
    .innerJoin('websites', 'websites.id', 'website_user_details.website_id')
    .select('websites.id', 'websites.name as name')
    .where('users.id', '=', user_id);

  return {
    data: applications.map(item => {
      return {
        ...item,
      };
    }),
  };
};
