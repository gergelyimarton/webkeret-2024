import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MainComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatButtonModule,
  ]
})
export class MainModule { }
