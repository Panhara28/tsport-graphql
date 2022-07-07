export function each_year_exports(exports_year) {
  let each_year_exports = [];

  for (let i = 0; i < exports_year?.length; i++) {
    each_year_exports.push({
      year: exports_year[i]?.year,
      value: exports_year[i]?.custom_value_usd?.toFixed(2),
    });
  }

  return each_year_exports;
}
