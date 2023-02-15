import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms'

import { FilterPipe } from '../filter.pipe'

@NgModule({
  declarations: [
    ListComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ListModule { }
