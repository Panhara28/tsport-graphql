import ContextType from 'src/graphql/ContextType';

export const CountryDetailQuery = async (
  _,
  { websiteId, countryId }: { websiteId: number; countryId: number },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const country = await knex
    .table('stat_countries')
    .where({ website_id: websiteId })
    .andWhere({ id: countryId })
    .first();

  return {
    ...country,
    countryName: {
      en: country.country_name,
      kh: country.country_name_kh,
    },
  };
};
