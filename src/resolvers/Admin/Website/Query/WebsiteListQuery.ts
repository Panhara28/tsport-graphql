import ContextType from 'src/graphql/ContextType';

export const WebsiteListQuery = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const websiteList = await knex.table('websites');

  return {
    data: websiteList.map(x => {
      return {
        ...x,
      };
    }),
  };
};
