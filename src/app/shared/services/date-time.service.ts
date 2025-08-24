import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  private formatDefault = 'DD/MM/YYYY';

  constructor() {}

  convertDateToUtc(date: any) {
    var utc = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return utc;
  }

  convertDateToLong(
    date?: Date,
    isTime?: boolean,
    format?: string
  ): number | null {
    if (!date) return null;

    if (!isTime) {
      date = this.formatTimeDefault(date); // Hàm formatTimeDefault cần được định nghĩa trước
    }

    const formatDate = (date: Date, format: string): string => {
      const pad = (num: number) => (num < 10 ? `0${num}` : num.toString());

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1); // Tháng bắt đầu từ 0
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());

      switch (format) {
        case 'YYYYMMDDHHmmss':
          return `${year}${month}${day}${hours}${minutes}${seconds}`;
        case 'YYYYMMDD':
          return `${year}${month}${day}`;
        case 'HHmmss':
          return `${hours}${minutes}${seconds}`;
        default:
          // Mặc định format YYYYMMDDHHmmss
          return `${year}${month}${day}${hours}${minutes}${seconds}`;
      }
    };

    if (date) {
      return parseFloat(formatDate(date, format || 'YYYYMMDDHHmmss'));
    }

    return parseFloat(formatDate(new Date(), format || 'YYYYMMDDHHmmss'));
  }

  convertLongToDate(number: number) {
    var str = number.toString();
    var y = parseInt(str.substring(0, 4));
    var m = parseInt(str.substring(4, 6)) - 1;
    var d = parseInt(str.substring(6, 8));
    var hh = parseInt(str.substring(8, 10));
    var mm = parseInt(str.substring(10, 12));
    var ss = parseInt(str.substring(12, 14));

    var result = new Date(y, m, d, hh, mm, ss);
    return result;
  }

  formatTimeDefault(date: Date) {
    if (!date) return undefined;
    date = _.cloneDeep(date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  }

  /* #region  chuyển đổi kiểu ngày tháng sang string theo định dạng. mạc đinh DD/MM/YYYY */
  convertDateToString(date: Date, format: string): string {
    if (!date) {
      throw new Error('Date is required');
    }

    format = format || this.formatDefault;

    const pad = (num: number) => (num < 10 ? `0${num}` : num.toString());

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Tháng bắt đầu từ 0
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    // Xử lý định dạng
    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  /* #endregion */

  getWeekDate(date: Date) {
    let days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return days[date.getDay()];
  }

  /* #region  so sanh 2 ngay  Nếu ngày A > B => 1 Nếu ngày A < b => -1 Nếu Ngày A = B => 0 */
  compareTwoDay(valueA: Date, valueB: Date): number {
    var strValueA = this.convertDateToString(valueA, 'YYYY-MM-DD');
    var strValueB = this.convertDateToString(valueB, 'YYYY-MM-DD');

    if (strValueA < strValueB) {
      return -1;
    } else if (strValueA > strValueB) {
      return 1;
    }
    return 0;
  }
  /* #endregion */

  compareTwoDate2(dateA: FormControl, key?: string): ValidatorFn {
    return (dateB: AbstractControl): { [key: string]: any } | null => {
      if (!dateA.value || !dateB.value) return null;

      var result = this.compareTwoDay(dateA.value, dateB.value);

      if (key == '>') return result == 1 ? { smallerDate: true } : null;
      return result == -1 ? { exceedDate: true } : null;
    };
  }

  formatDateToDDMM(date: Date | string): string {
    const parsedDate = new Date(date);
    const pad = (num: number) => (num < 10 ? `0${num}` : num.toString());

    const day = pad(parsedDate.getDate());
    const month = pad(parsedDate.getMonth() + 1); // Tháng bắt đầu từ 0

    return `${day}-${month}`;
  }
}
