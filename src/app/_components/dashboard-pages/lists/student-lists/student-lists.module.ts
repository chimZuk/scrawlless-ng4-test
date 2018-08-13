import { NgModule } from '@angular/core';
import { StudentListsComponent } from './student-lists.component';

import { FormsModule } from '@angular/forms';

import { StudentListsRouter } from './student-lists.router'

import { SharedModule } from '../../../../_modules/shared/shared.module'

import { CreateListComponent } from '../../../dialogs/dashboard-dialogs/create-list/create-list.component';

import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  imports: [
    FormsModule,
    StudentListsRouter,
    SharedModule,
    MatExpansionModule
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
