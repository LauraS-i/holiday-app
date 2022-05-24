import { Component, OnInit, Input} from '@angular/core';
import {HolidayTable} from "../../interfaces/holiday-table";

@Component({
  selector: 'app-holidays-list',
  templateUrl: './holidays-list.component.html',
  styleUrls: ['./holidays-list.component.css']
})
export class HolidaysListComponent implements OnInit {
  @Input() holiday : HolidayTable = {
    date: '',
    firstCountryHolidayName: '',
    secondCountryHolidayName: ''};
  @Input() index:number = 0;
  @Input() remainingTimeElement: string = '';
  @Input() closestDay: Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

  closestHolidayBoolean(holiday: HolidayTable) {
    let closestDayBoolean;
    if (new Date(holiday.date).getMonth() === this.closestDay.getMonth() &&
      new Date(holiday.date).getDate() === this.closestDay.getDate()) {
      closestDayBoolean = true;
    } else {
      closestDayBoolean = false;
    }
    return closestDayBoolean;
  }

}
