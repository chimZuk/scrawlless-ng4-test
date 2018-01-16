import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';

import { FormsModule } from '@angular/forms';

import { UsersRouter } from './users.router'

import { SharedModule } from '../../../_modules/shared/shared.module'
import { UserCardModule } from '../../web-elements/user-card/user-card.module'

@NgModule({
  imports: [
    FormsModule,
    UsersRouter,
    SharedModule,
    UserCardModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: []
})
export class UsersModule { }
