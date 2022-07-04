type filterProps = {
  year: string;
  month: string;
  second_month: string;
  countries: string[];
};

export async function timeframe_month(filter: filterProps, knex) {
  let data = [];

  for (const country of filter?.countries) {
    const first_year_import = await knex
      .table('imports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('origin_country', '=', country)
      .andWhere('year', '=', Number(filter?.year) - 1)
      .andWhereBetween('month', [Number(filter?.month), Number(filter?.second_month)])
      .first();

    const second_year_import = await knex
      .table('imports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('origin_country', '=', country)
      .andWhere('year', '=', filter?.year)
      .andWhereBetween('month', [Number(filter?.month), Number(filter?.second_month)])
      .first();

    const first_year_export = await knex
      .table('exports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('destination_country', '=', country)
      .andWhere('year', '=', Number(filter?.year) - 1)
      .andWhereBetween('month', [Number(filter?.month), Number(filter?.second_month)])
      .first();

    const second_year_export = await knex
      .table('exports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('destination_country', '=', country)
      .andWhere('year', '=', filter?.year)
      .andWhereBetween('month', [Number(filter?.month), Number(filter?.second_month)])
      .first();

    const full_country_name = await knex
      .table('stat_countries')
      .where('code', '=', country)
      .first();

    data.push({
      country: country,
      country_name: full_country_name?.country_name,
      data: {
        year: {
          month_start: filter?.month,
          month_end: filter?.second_month,
          year: Number(filter?.year) - 1,
          imports: first_year_import.custom_value_usd,
          exports: first_year_export.custom_value_usd,
          volumes: Number(first_year_import.custom_value_usd) + Number(first_year_export.custom_value_usd),
          balances: Number(first_year_export.custom_value_usd) - Number(first_year_import.custom_value_usd),
        },
        second_year: {
          month_start: filter?.month,
          month_end: filter?.second_month,
          year: filter?.year,
          imports: second_year_import.custom_value_usd,
          exports: second_year_export.custom_value_usd,
          volumes: Number(second_year_import.custom_value_usd) + Number(second_year_export.custom_value_usd),
          balances: Number(second_year_export.custom_value_usd) - Number(second_year_import.custom_value_usd),
        },
      },
    });
  }

  return data;
}
