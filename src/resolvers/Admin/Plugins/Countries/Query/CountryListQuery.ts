import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CountryListQuery = async (
  _,
  { pagination, websiteId }: { pagination: Graph.PaginationInput; websiteId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const query = knex.table('stat_countries').where({ website_id: websiteId });

  if (pagination.size != undefined && pagination.page != undefined) {
    query.limit(pagination.size).offset((pagination.page - 1) * pagination.size);
  }

  const countries = await query;

  return {
    data: countries.map((item: any) => {
      return {
        ...item,
        countryName: {
          en: item.country_name,
          kh: item.country_name_kh,
        },
      };
    }),
    pagination: {
      total: countries.length,
      size: countries.length,
      current: pagination.page,
    },
  };
};
