import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { CityPipe } from './shared/pipes/city.pipe';
import { AsyncCityPipe } from './shared/pipes/async-city.pipe';
import { AirportsComponent } from './airports/airports.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule],
  declarations: [AppComponent, SidebarComponent, NavbarComponent, FlightSearchComponent, CityPipe, AsyncCityPipe, AirportsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
