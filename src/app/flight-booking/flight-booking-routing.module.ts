import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { AirportsComponent } from './airports/airports.component';

const flightBookingRoutes: Routes = [
  {
    path: '',
    redirectTo: 'flight-search',
    pathMatch: 'full'
  },
  {
    path: 'flight-edit/:id',
    component: FlightEditComponent
  },
  {
    path: 'flight-search',
    component: FlightSearchComponent
  },
  {
    path: 'airports',
    component: AirportsComponent
  },
  {
    path: 'passenger-search',
    component: PassengerSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(flightBookingRoutes)],
  exports: [RouterModule]
})
export class FlightBookingRoutingModule {}
