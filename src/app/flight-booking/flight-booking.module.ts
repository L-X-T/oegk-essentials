import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FlightSearchComponent } from './flight-search/flight-search.component';
import { AirportsComponent } from './airports/airports.component';
import { FlightCardComponent } from './flight-card/flight-card.component';

@NgModule({
  imports: [SharedModule],
  declarations: [FlightSearchComponent, AirportsComponent, FlightCardComponent],
  exports: [SharedModule, FlightSearchComponent, AirportsComponent]
})
export class FlightBookingModule {}
