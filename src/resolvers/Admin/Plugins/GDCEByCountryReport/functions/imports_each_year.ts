export function each_year_imports(imports_year, from?: any, to?: any) {
  let each_year_imports = [];

  if (from && to) {
    let cnt = 0;
    for (let i = Number(from); i <= Number(to); i++) {
      if (imports_year[cnt]?.year === i?.toString()) {
        each_year_imports.push({
          year: imports_year[cnt]?.year,
          value: imports_year[cnt]?.custom_value_usd?.toFixed(2),
        });

        cnt++;
      } else {
        each_year_imports.push({
          year: i.toString(),
          value: 0,
        });
      }
    }

    return each_year_imports;
  }

  for (let i = 0; i < imports_year?.length; i++) {
    each_year_imports.push({
      year: imports_year[i]?.year,
      value: imports_year[i]?.custom_value_usd?.toFixed(2),
    });
  }

  return each_year_imports;
}
