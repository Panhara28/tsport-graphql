export function each_year_imports(imports_year) {
  let each_year_imports = [];

  for (let i = 0; i < imports_year?.length; i++) {
    each_year_imports.push({
      year: imports_year[i]?.year,
      value: imports_year[i]?.custom_value_usd?.toFixed(2),
    });
  }

  return each_year_imports;
}
