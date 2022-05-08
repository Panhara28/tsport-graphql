import ContextType from 'src/graphql/ContextType';

export const ProvinceListQuery = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;
  const provinceList = await knex.table('provinces');

  return provinceList.map(province => {
    return {
      ...province,
    };
  });
};
