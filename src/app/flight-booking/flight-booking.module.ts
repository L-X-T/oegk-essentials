import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FlightSearchComponent } from './flight-search/flight-search.component';
import { AirportsComponent } from './airports/airports.component';

@NgModule({
  imports: [SharedModule],
  declarations: [FlightSearchComponent, AirportsComponent],
  exports: [SharedModule, FlightSearchComponent, AirportsComponent]
})
export class FlightBookingModule {}
