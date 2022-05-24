import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Country} from "../interfaces/country";
import {HolidayTable} from "../interfaces/holiday-table";
import {Holiday} from "../interfaces/holiday"
import {map} from "rxjs/operators"
import {ApiService} from "../services/api.service";
import {HolidaysTableService} from "../services/holidays-table-service";

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html'

})
export class HolidaysComponent implements OnInit {
  countriesArray: Array<Country> = [];
  countriesNameArray: Array<String> = [];
  selectedValue1: string = '';
  selectedValue2: string = '';
  firstHolidaysArray: Array<Holiday> = [];
  secondHolidaysArray: Array<Holiday> = [];
  allHolidaysArray: Array<HolidayTable> = [];
  todaysDate: Date = new Date();
  datesAfterToday: Array<Date> = [];
  remainingTimeElement: string = '';
  closestDay: Date = new Date();


  constructor(private http: HttpClient, private apiService: ApiService, private holidaysTableService: HolidaysTableService) {
  }

  ngOnInit() {
    this.loadCountries();
    this.todaysDate = new Date(new Date().getFullYear() - 21, new Date().getMonth(), new Date().getDate());
  }
  loadHolidaysFromApi(countryCode: String, countryNumber: number) {
    this.apiService.getHolidays(countryCode, countryNumber)
      .pipe(map(
        response => response.holidays.map(
          (holiday) => {
            return {
              date: holiday.date,
              name: holiday.name,
              country: countryNumber
            }
          }
        )
      )).subscribe(
      (holidays) => {
        if (countryNumber === 1) {
          this.firstHolidaysArray = holidays;
        } else {
          this.secondHolidaysArray = holidays;
        }
        this.allHolidaysArray = this.holidaysTableService.getHolidaysTable(this.firstHolidaysArray, this.secondHolidaysArray)
        this.closestHoliday();
      }
    )
  }
  loadCountries() {
    this.apiService.getCountries().pipe(map(
      responseObject => {
        responseObject.countries.forEach(element => {
            this.countriesArray.push({
              name: element.name,
              code: element.code
            });
            this.countriesNameArray.push(element.name)
          }
        )
      }
    )).subscribe(e => {
      this.countriesNameArray.sort();
    })
  }
  loadHolidays(country: string, countryNumber: number) {
    let countryCode: string = '';
    for (let i = 0; i < this.countriesArray.length; i++) {
      if (this.countriesArray[i].name === country) {   // filter?
        countryCode = this.countriesArray[i].code;
        break;
      }
    }
    this.loadHolidaysFromApi(countryCode, countryNumber);
  }
  closestHoliday() {
    for (let i = 0; i < this.allHolidaysArray.length; i++) {
      let dayObject = this.allHolidaysArray[i];
      let holidayDate = new Date(dayObject.date);
      let difference = (holidayDate.valueOf() - this.todaysDate.valueOf()) / (3600 * 24 * 1000);
      if (difference > 0) {
        this.datesAfterToday.push(holidayDate);
        this.datesAfterToday.sort((a, b) => a.valueOf() - b.valueOf())
        break;
      }
    }
    this.closestDay = this.datesAfterToday[0];
    setInterval(() => {
      this.remainingTimeElement = this.remainingTime(this.closestDay);
    }, 1000);
  }

  remainingTime(closestDay: Date) {

    closestDay = new Date(2022, closestDay.getMonth(), closestDay.getDate());
    let totalSeconds = (closestDay.getTime() - new Date().getTime()) / 1000;
    let days = Math.floor(totalSeconds / (3600 * 24));
    totalSeconds %= 3600 * 24;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return `   ${days} d ${hours} h ${minutes} m ${seconds} s`;
  }
}


