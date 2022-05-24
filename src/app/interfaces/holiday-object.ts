import {Holiday} from "./holiday";

export interface HolidayObject {
  holidays: Array<Holiday>,
  requests: Object,
  status: number,
  warning: string

}
