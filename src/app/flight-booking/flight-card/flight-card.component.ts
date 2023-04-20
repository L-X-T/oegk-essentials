import { Component, ElementRef, inject, Input, NgZone, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { Flight } from '../../entities/flight';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  debug = true;
  // isInitialized = false;

  @Input({ required: true }) item!: Flight;
  @Input() selected = false;

  private readonly elementRef = inject(ElementRef);
  private readonly ngZone = inject(NgZone);

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

  blink(): void {
    // Dirty Hack used to visualize the change detector
    // let originalColor = this.elementRef.nativeElement.firstChild.style.backgroundColor;
    this.elementRef.nativeElement.firstChild.style.backgroundColor = 'crimson';
    //              ^----- DOM-Element

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.elementRef.nativeElement.firstChild.style.backgroundColor = this.selected ? 'rgb(204, 197, 185)' : '';
      }, 1000);
    });
  }
}
