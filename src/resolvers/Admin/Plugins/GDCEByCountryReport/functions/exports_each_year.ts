export function each_year_exports(exports_year, from?: any, to?: any) {
  let each_year_exports = [];

  if (from && to) {
    let cnt = 0;
    for (let i = Number(from); i <= Number(to); i++) {
      if (exports_year[cnt]?.year === i?.toString()) {
        each_year_exports.push({
          year: exports_year[cnt]?.year,
          value: exports_year[cnt]?.custom_value_usd?.toFixed(2),
        });
        cnt++;
      } else {
        each_year_exports.push({
          year: i.toString(),
          value: 0,
        });
      }
    }

    return each_year_exports;
  }

  for (let i = 0; i < exports_year?.length; i++) {
    each_year_exports.push({
      year: exports_year[i]?.year,
      value: exports_year[i]?.custom_value_usd?.toFixed(2),
    });
  }

  return each_year_exports;
}
