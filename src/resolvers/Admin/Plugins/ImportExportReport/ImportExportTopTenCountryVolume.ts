import ContextType from 'src/graphql/ContextType';

export const ImportExportTopTenCountryVolume = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const imports_detail = await knex.raw(
    `
    SELECT ed.origin_country as country, sum(ed.custom_value_usd) as volume
    FROM imports_detail AS ed
    GROUP BY ed.origin_country
    ORDER BY Sum(ed.custom_value_usd) DESC LIMIT 10
    `,
  );

  const exports_detail = await knex.raw(
    `
    SELECT ed.destination_country as country, sum(ed.custom_value_usd) as volume
    FROM exports_detail AS ed
    GROUP BY ed.destination_country
    ORDER BY Sum(ed.custom_value_usd) DESC LIMIT 10
    `,
  );

  const volumes_detail = await knex.raw(
    `
    select country,sum(custom_value_usd) AS volume
    from
    (
        select imports_detail.origin_country AS country ,imports_detail.custom_value_usd
        FROM imports_detail
        union all
        select exports_detail.destination_country AS country, exports_detail.custom_value_usd
        from exports_detail
    ) t
    group by country ORDER BY volume desc
    LIMIT 10
    `,
  );

  return {
    data: {
      imports: imports_detail[0],
      exports: exports_detail[0],
      volumes: volumes_detail[0],
    },
  };
};
