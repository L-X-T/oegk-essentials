import { Component, computed, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Flight } from '../../entities/flight';
import { FlightService } from '../../services/flight.service';
import { BehaviorSubject, Observable, Observer, of, pipe, Subject, Subscription } from 'rxjs';
import { catchError, share, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit, OnDestroy {
  from = 'Hamburg';
  to = 'Graz';
  flights: Flight[] = []; // old school
  flights$?: Observable<Flight[]>; // observable
  readonly flightsSubject = new BehaviorSubject<Flight[]>([]); // subject
  readonly flightsSignal = signal<Flight[]>([]); // signal
  flightsLength = computed(() => this.flightsSignal().length); // signal
  flightsSubscription?: Subscription;
  private readonly onDestroySubject = new Subject<void>();
  readonly terminator$ = this.onDestroySubject.asObservable();

  selectedFlight?: Flight;

  message = '';

  private readonly destroyRef = inject(DestroyRef);
  private readonly flightService = inject(FlightService);

  constructor() {
    effect(() => console.log(this.flightsSignal(), this.flightsLength()));
  }

  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  ngOnInit(): void {
    if (this.from && this.to) {
      this.onSearch();
    }
  }

  ngOnDestroy(): void {
    // 4a. my unsubscribe
    this.flightsSubscription?.unsubscribe();

    // 4b. subject emit thru terminator$
    this.onDestroySubject.next(void 0);
    this.onDestroySubject.complete();

    // complete behavior subject
    this.flightsSubject.complete();
  }

  onSearch(): void {
    // 1. my hot observable
    this.flights$ = this.flightService.find(this.from, this.to).pipe(
      // catchError((err: HttpErrorResponse) => {
      //   console.log(err.message);
      //   return of([]);
      // }),
      share()
    );

    // 2. my observer
    const flightsObserver: Observer<Flight[]> = {
      next: (flights) => this.onNextFlights(flights),
      error: (errResp: HttpErrorResponse) => console.error('Error loading flights', errResp),
      complete: () => console.debug('Flights loading completed.')
    };

    // 3a. my subscription
    this.flightsSubscription?.unsubscribe();
    this.flightsSubscription = this.flights$.subscribe(flightsObserver);

    // 3b. takeUntil terminator$ emits
    this.flights$.pipe(takeUntil(this.terminator$)).subscribe(flightsObserver);

    // 3c. takeUntilDestroyed
    this.flights$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(flightsObserver);
  }

  private onNextFlights(flights: Flight[]): void {
    this.flights = flights;
    this.flightsSubject.next(flights);
    this.flightsSignal.set(flights);
    this.flightsSignal.update((flights) => [...flights]);
  }

  onSelect(selectedFlight: Flight): void {
    this.selectedFlight = selectedFlight;
  }

  onSave(): void {
    if (this.selectedFlight) {
      this.flightService
        .save(this.selectedFlight)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
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
