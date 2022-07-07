import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import { each_year_balance } from '../functions/each_year_balance';
import { each_year_volume } from '../functions/each_year_volume';

export const GDCEByCountryReportQuery = async (
  _,
  { filter }: { filter: Graph.GDCEByCountryReportFilters },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const imports_query = knex.table('imports_detail');
  const exports_query = knex.table('exports_detail');

  const imports_each_year_query = knex.table('imports_detail');
  const exports_each_year_query = knex.table('exports_detail');

  if (filter?.country) {
    imports_query.andWhere('origin_country', '=', filter?.country);
    exports_query.andWhere('destination_country', '=', filter?.country);

    imports_each_year_query.andWhere('origin_country', '=', filter?.country);
    exports_each_year_query.andWhere('destination_country', '=', filter?.country);
  }

  if (filter?.from && filter?.to) {
    imports_query.andWhereBetween('year', [filter?.from, filter?.to]);
    exports_query.andWhereBetween('year', [filter?.from, filter?.to]);

    imports_each_year_query.andWhereBetween('year', [filter?.from, filter?.to]);
    exports_each_year_query.andWhereBetween('year', [filter?.from, filter?.to]);
  }

  const imports = await imports_query;
  const exports = await exports_query;

  const exports_each_year = await exports_each_year_query
    .select('year', 'custom_value_usd')
    .sum({ custom_value_usd: 'custom_value_usd' })
    .groupBy('year');
  const imports_each_year = await imports_each_year_query
    .select('year', 'custom_value_usd')
    .sum({ custom_value_usd: 'custom_value_usd' })
    .groupBy('year');

  const imports_total = imports.reduce((prev, cur) => {
    return prev + cur?.custom_value_usd;
  }, 0);

  const exports_total = exports.reduce((prev, cur) => {
    return prev + cur?.custom_value_usd;
  }, 0);

  return {
    importsList: imports,
    exportsList: exports,
    volume: imports_total + exports_total,
    balance: exports_total - imports_total,
    volumeEachYear: each_year_volume(imports_each_year, exports_each_year),
    balanceEachYear: each_year_balance(imports_each_year, exports_each_year),
  };
};
