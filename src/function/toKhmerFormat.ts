import DateHelper from './DateHelper';
import { toKhmerNumber } from './DayNumberToKhmerNumber';

export function toKhmerFormat(s) {
  const date = DateHelper.getNowDate(s, 'M/DD/YYYY');
  const getDay = date.split('/')[1];
  const getMonth = date.split('/')[0];
  const getYear = date.split('/')[2];
  const toKhmerdate = toKhmerNumber(getDay, getMonth, getYear);

  return toKhmerdate;
}
