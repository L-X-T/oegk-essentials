import { Component, inject } from '@angular/core';

import { AirportService } from '../../services/airport.service';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html'
})
export class AirportsComponent {
  readonly airports$ = inject(AirportService).findAll();
}
