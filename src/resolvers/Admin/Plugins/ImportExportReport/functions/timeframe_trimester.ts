type filterProps = {
  year: string;
  trimester: String;
  countries: string[];
};

export async function timeframe_trimester(filter: filterProps, knex) {
  let data = [];

  for (const country of filter?.countries) {
    const first_year_import = await knex
      .table('imports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('origin_country', '=', country)
      .andWhere('year', '=', Number(filter?.year) - 1)
      .andWhereBetween('month', [Number(filter?.trimester) * 3 + 1, Number(filter?.trimester) * 3 + 3])
      .first();

    const second_year_import = await knex
      .table('imports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('origin_country', '=', country)
      .andWhere('year', '=', filter?.year)
      .andWhereBetween('month', [Number(filter?.trimester) * 3 + 1, Number(filter?.trimester) * 3 + 3])
      .first();

    const first_year_export = await knex
      .table('exports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('destination_country', '=', country)
      .andWhere('year', '=', Number(filter?.year) - 1)
      .andWhereBetween('month', [Number(filter?.trimester) * 3 + 1, Number(filter?.trimester) * 3 + 3])
      .first();

    const second_year_export = await knex
      .table('exports_detail')
      .sum({ custom_value_usd: 'custom_value_usd' })
      .where('destination_country', '=', country)
      .andWhere('year', '=', filter?.year)
      .andWhereBetween('month', [Number(filter?.trimester) * 3 + 1, Number(filter?.trimester) * 3 + 3])
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
          year: Number(filter?.year) - 1,
          trimester: Number(filter?.trimester) + 1,
          imports: first_year_import.custom_value_usd,
          exports: first_year_export.custom_value_usd,
          volumes: Number(first_year_import.custom_value_usd) + Number(first_year_export.custom_value_usd),
          balances:
            Number(first_year_import.custom_value_usd) - Number(first_year_export.custom_value_usd) < 0
              ? (Number(first_year_import.custom_value_usd) - Number(first_year_export.custom_value_usd)) * -1
              : Number(first_year_import.custom_value_usd) - Number(first_year_export.custom_value_usd),
        },
        second_year: {
          year: filter?.year,
          trimester: Number(filter?.trimester) + 1,
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
