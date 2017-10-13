import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';

import { FormsModule } from '@angular/forms';

import { UsersRouter } from './users.router'

import { SharedModule } from '../../../_modules/shared/shared.module'
import { UserCardComponent } from '../../web-elements/user-card/user-card.component'

@NgModule({
  imports: [
    FormsModule,
    UsersRouter,
    SharedModule,
  ],
  declarations: [
    UsersComponent,
    UserCardComponent
  ],
  providers: []
})
export class UsersModule { }
