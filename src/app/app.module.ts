import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from "@angular/common";

import { AppComponent } from './app.component';
import { HolidaysComponent } from './holidays/holidays.component';
import {FormsModule} from "@angular/forms";
import { HolidaysListComponent } from './holidays/holidays-list/holidays-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HolidaysComponent,
    HolidaysListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
