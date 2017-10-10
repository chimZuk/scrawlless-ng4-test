import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';

import { FormsModule } from '@angular/forms';

import { UsersRouter } from './users.router'

import { SharedModule } from '../../../_modules/shared/shared.module'

@NgModule({
  imports: [
    FormsModule,
    UsersRouter,
    SharedModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: []
})
export class UsersModule { }
