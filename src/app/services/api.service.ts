import { Injectable } from '@angular/core';
import {ApiConstants} from "../api.constants";
import {CountriesResponse} from "../interfaces/countries-response";
import {HttpClient} from "@angular/common/http";
import {HolidayObject} from "../interfaces/holiday-object";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCountries() {
    const countryUrl = `${ApiConstants.URL_BASE_COUNTRIES}key=${ApiConstants.API_KEY}`;
    return this.http.get<CountriesResponse>(countryUrl);
  }
  getHolidays(countryCode: String, countryNumber: number) {
    return this.http.get<HolidayObject>(`${ApiConstants.URL_BASE_HOLIDAYS}?key=${ApiConstants.API_KEY}&country=${countryCode}&year=2021&language=hu`)}
}
