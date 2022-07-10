import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateCountryMutation = async (
  _,
  { websiteId, countryId, input }: { websiteId: number; countryId: number; input: Graph.CountryInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const updateCountry = await knex
    .table('stat_countries')
    .update({
      country_name: input.country_name_en,
      country_name_kh: input.country_name_kh,
      code: input.code,
      country_image: input.country_image,
    })
    .where({ id: countryId })
    .andWhere({ website_id: websiteId });

  return updateCountry > 0;
};
