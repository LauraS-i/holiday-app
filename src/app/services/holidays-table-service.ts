import {Injectable} from '@angular/core';
import {Holiday} from "../interfaces/holiday";

@Injectable({
  providedIn: 'root',
})
export class HolidaysTableService {

  constructor() {
  }

  getHolidaysTable(firstCountryArray: Array<Holiday>, secondCountryArray: Array<Holiday>) {
    let bothHolidays = [];
    let mergedHolidays = [];
    bothHolidays.push(...firstCountryArray, ...secondCountryArray);
    bothHolidays.sort((firstCountry, secondCountry) => {
      return (
        new Date(firstCountry.date).valueOf() - new Date(secondCountry.date).valueOf() ||
        firstCountry.name.localeCompare(secondCountry.name)
      );
    });
    for (let i = 0; i < bothHolidays.length - 1; i++) {
      const checkIfTwoDatesAreEqual =
        new Date(bothHolidays[i].date).valueOf() ===
        new Date(bothHolidays[i + 1].date).valueOf();
      if (checkIfTwoDatesAreEqual) {
        mergedHolidays.push({
          date: new Date(bothHolidays[i].date).toLocaleString('default', {month: 'long'}) + '  ' + new Date(bothHolidays[i].date).getDate(),
          firstCountryHolidayName: bothHolidays[i].name,
          secondCountryHolidayName: bothHolidays[i + 1].name
        });
        i++;
      } else {
        if (bothHolidays[i].country === 1) {
          mergedHolidays.push({
            date: new Date(bothHolidays[i].date).toLocaleString('default', {month: 'long'}) + '  ' + new Date(bothHolidays[i].date).getDate(),
            firstCountryHolidayName: bothHolidays[i].name,
            secondCountryHolidayName: '-'
          });
        } else {
          mergedHolidays.push({
            date: new Date(bothHolidays[i].date).toLocaleString('default', {month: 'long'}) + '  ' + new Date(bothHolidays[i].date).getDate(),
            firstCountryHolidayName: '-',
            secondCountryHolidayName: bothHolidays[i].name
          });
        }
      }
    }
    return mergedHolidays;
  }


}
