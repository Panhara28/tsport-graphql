type filterProps = {
  year: string;
  second_year: string;
  countries: string[];
};

export async function timeframe_year(filter: filterProps, knex) {
  let data = [];

  for (const country of filter?.countries) {
    const first_year_import = await knex
      .table('imports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('origin_country', '=', country)
      .andWhere('year', '=', filter?.year)
      .first();

    const second_year_import = await knex
      .table('imports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('origin_country', '=', country)
      .andWhere('year', '=', filter?.second_year)
      .first();

    const first_year_export = await knex
      .table('exports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('destination_country', '=', country)
      .andWhere('year', '=', filter?.year)
      .first();

    const second_year_export = await knex
      .table('exports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('destination_country', '=', country)
      .andWhere('year', '=', filter?.second_year)
      .first();

    data.push({
      country: country,
      data: {
        year: {
          year: filter?.year,
          imports: first_year_import.custom_value_usd,
          exports: first_year_export.custom_value_usd,
          volumes: Number(first_year_import.custom_value_usd) + Number(first_year_export.custom_value_usd),
          balances:
            Number(first_year_import.custom_value_usd) - Number(first_year_export.custom_value_usd) < 0
              ? (Number(first_year_import.custom_value_usd) - Number(first_year_export.custom_value_usd)) * -1
              : Number(first_year_import.custom_value_usd) - Number(first_year_export.custom_value_usd),
        },
        second_year: {
          year: filter?.second_year,
          imports: second_year_import.custom_value_usd,
          exports: second_year_export.custom_value_usd,
          volumes: Number(second_year_import.custom_value_usd) + Number(second_year_export.custom_value_usd),
          balances:
            Number(second_year_import.custom_value_usd) - Number(second_year_export.custom_value_usd) < 0
              ? Number(second_year_import.custom_value_usd) - Number(second_year_export.custom_value_usd) * -1
              : Number(second_year_import.custom_value_usd) - Number(second_year_export.custom_value_usd),
        },
      },
    });
  }

  return data;
}
