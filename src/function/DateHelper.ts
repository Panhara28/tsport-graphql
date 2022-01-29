import moment from 'moment-timezone';

export default class DateHelper {
  static getNowDate(date, format) {
    return moment(date)
      .tz('Asia/Phnom_Penh')
      .format(format);
  }

  static getNowDateTime() {
    return moment()
      .tz('Asia/Phnom_Penh')
      .format('YYYY-MM-DD HH:mm:ss');
  }
  static convertDateTimetoDate(date: string) {
    return moment(date)
      .tz('Asia/Phnom_Penh')
      .format('YYYY-MM-DD');
  }
}
