import {Country} from "./country";

export interface CountriesResponse {
  status: number,
  request: Object,
  countries: Array<Country>
}
