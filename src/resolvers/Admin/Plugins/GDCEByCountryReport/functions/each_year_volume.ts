export function each_year_volume(imports_year, exports_year) {
  let each_year_volume = [];

  for (let i = 0; i < imports_year?.length; i++) {
    each_year_volume.push({
      year: imports_year[i]?.year,
      volume: (imports_year[i]?.custom_value_usd + exports_year[i]?.custom_value_usd)?.toFixed(2),
    });
  }

  return each_year_volume;
}
