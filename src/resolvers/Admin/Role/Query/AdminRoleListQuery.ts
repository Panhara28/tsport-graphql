import ContextType from 'src/graphql/ContextType';

export const AdminRoleListQuery = async (_, { websiteId }: { websiteId: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const adminRoleList = await knex
    .table('websites')
    .innerJoin('roles', 'websites.id', 'roles.website_id')
    .select('roles.id', 'roles.name as name')
    .where('websites.id', '=', websiteId);

  return {
    data: adminRoleList.map(item => {
      return {
        ...item,
      };
    }),
  };
};
