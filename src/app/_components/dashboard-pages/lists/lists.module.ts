import { NgModule } from '@angular/core';
import { ListsComponent } from './lists.component';

import { FormsModule } from '@angular/forms';

import { ListsRouter } from './lists.router'

import { SharedModule } from '../../../_modules/shared/shared.module'

@NgModule({
  imports: [
    FormsModule,
    ListsRouter,
    SharedModule
  ],
  declarations: [
    ListsComponent
  ]
})
export class ListsModule { }
