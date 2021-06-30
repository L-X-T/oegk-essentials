import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CityPipe } from './pipes/city.pipe';
import { AsyncCityPipe } from './pipes/async-city.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [CityPipe, AsyncCityPipe],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, CityPipe, AsyncCityPipe]
})
export class SharedModule {}
