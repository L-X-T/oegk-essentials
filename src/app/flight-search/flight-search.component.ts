import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Flight } from '../entities/flight';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  from = 'Hamburg';
  to = 'Graz';
  flights: Flight[] = [];
  selectedFlight?: Flight;

  message = '';

  private readonly flightService = inject(FlightService);
  // constructor(private flightService: FlightService) {}

  onSearch(): void {
    this.flightService.find(this.from, this.to).subscribe({
      next: (flights) => {
        this.flights = flights;
      },
      error: (errResp: HttpErrorResponse) => {
        console.error('Error loading flights', errResp);
      },
      complete: () => {
        console.debug('Flights loading completed.');
      }
    });
  }

  onSelect(selectedFlight: Flight): void {
    this.selectedFlight = selectedFlight;
  }

  onSave(): void {
    if (this.selectedFlight) {
      this.flightService.save(this.selectedFlight).subscribe({
        next: (flight) => {
          console.log('Flight saved: ', flight);
          this.selectedFlight = flight;
          this.message = 'Success!';
        },
        error: (errResponse: HttpErrorResponse) => {
          console.error('Error saving flight', errResponse);
          this.message = 'Error: ' + errResponse.message;
        }
      });
    }
  }
}