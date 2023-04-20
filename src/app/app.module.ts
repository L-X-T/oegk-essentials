import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FlightBookingModule, AppRoutingModule],
  declarations: [AppComponent, SidebarComponent, NavbarComponent, HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
