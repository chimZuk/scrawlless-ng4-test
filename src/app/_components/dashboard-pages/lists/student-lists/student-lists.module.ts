import { NgModule } from '@angular/core';
import { StudentListsComponent } from './student-lists.component';

import { FormsModule } from '@angular/forms';

import { StudentListsRouter } from './student-lists.router'

import { SharedModule } from '../../../../_modules/shared/shared.module'

import { CreateListComponent } from '../../../dialogs/dashboard-dialogs/create-list/create-list.component';


@NgModule({
  imports: [
    FormsModule,
    StudentListsRouter,
    SharedModule
  ],
  declarations: [
    StudentListsComponent,
    CreateListComponent
  ],
  entryComponents: [
    CreateListComponent
  ]
})
export class StudentListsModule { }
