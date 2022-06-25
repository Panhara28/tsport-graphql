import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import { timeframe_month } from './functions/timeframe_month';
import { timeframe_semester } from './functions/timeframe_semester';
import { timeframe_trimester } from './functions/timeframe_trimester';
import { timeframe_year } from './functions/timeframe_year';

export const ImportExportReportQuery = async (
  _,
  { filter }: { filter: Graph.ImportExportFilter },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  let data;

  if (filter?.timeframe === 'Year') {
    let newFilter = {
      countries: filter?.countries,
      year: filter?.year,
      second_year: filter?.second_year,
    };

    data = await timeframe_year(newFilter, knex);
  } else if (filter?.timeframe === 'Month') {
    let newFilter = {
      countries: filter?.countries,
      month: filter?.month,
      second_month: filter?.second_month,
      year: filter?.year,
    };

    data = await timeframe_month(newFilter, knex);
  } else if (filter?.timeframe === 'Trimester') {
    let newFilter = {
      countries: filter?.countries,
      trimester: filter?.trimester,
      year: filter?.year,
    };

    data = await timeframe_trimester(newFilter, knex);
  } else if (filter?.timeframe === 'Semester') {
    let newFilter = {
      countries: filter?.countries,
      semester: filter?.semester,
      year: filter?.year,
    };

    data = await timeframe_semester(newFilter, knex);
  }

  return data;
};
