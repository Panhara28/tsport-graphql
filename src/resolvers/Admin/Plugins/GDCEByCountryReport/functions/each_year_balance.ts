export function each_year_balance(imports_year, exports_year) {
  let each_year_balance = [];

  for (let i = 0; i < imports_year?.length; i++) {
    each_year_balance.push({
      year: imports_year[i]?.year,
      balance: Number(exports_year[i]?.custom_value_usd - imports_year[i]?.custom_value_usd)
        ? (exports_year[i]?.custom_value_usd - imports_year[i]?.custom_value_usd)?.toFixed(2)
        : 0,
    });
  }

  return each_year_balance;
}
