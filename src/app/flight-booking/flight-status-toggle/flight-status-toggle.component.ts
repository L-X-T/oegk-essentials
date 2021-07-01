import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-flight-status-toggle',
  templateUrl: './flight-status-toggle.component.html',
  styleUrls: ['./flight-status-toggle.component.css']
})
export class FlightStatusToggleComponent {
  @Input() delayed = false;
  @Output() delayedChange = new EventEmitter<boolean>();

  onToggleDelayed(): void {
    this.delayedChange.emit(!this.delayed);
  }
}
