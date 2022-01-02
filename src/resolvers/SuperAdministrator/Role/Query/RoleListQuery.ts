import ContextType from 'src/graphql/ContextType';

export const RoleListQuery = async (_, { websiteId }: { websiteId: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const roles = await knex
    .table('websites')
    .innerJoin('roles', 'websites.id', 'roles.website_id')
    .select('roles.id', 'roles.name as name')
    .where('websites.id', '=', websiteId);

  return {
    data: roles.map((x, idx) => {
      return {
        ...x,
      };
    }),
  };
};
