import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GasMeterRoutingModule } from './water-meter-routing.module';
import { WaterMeterComponent } from './water-meter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WaterMeterComponent
  ],
  imports: [
    CommonModule,
    GasMeterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class GasMeterModule { }
