import { Component, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';

import { Flight } from '../../entities/flight';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  debug = false;
  // isInitialized = false;

  @Input({ required: true }) item!: Flight;
  @Input() selected = false;

  constructor() {
    this.debugInputs('constructor');
  }

  ngOnChanges(): void {
    // this.init();
    this.debugInputs('ngOnChanges');
  }

  ngOnInit(): void {
    // this.init();
    this.debugInputs('ngOnInit');
  }

  ngOnDestroy(): void {
    this.debugInputs('ngOnDestroy');
  }

  private debugInputs(method: string): void {
    if (this.debug) {
      console.warn('[FlightCardComponent - ' + method + '()]');
      console.debug('flight', this.item);
      console.debug('selected', this.selected);
    }
  }

  /*private init(): void {
    if (this.isInitialized) {
      return;
    }

    // init

    this.isInitialized = true;
  }*/
}