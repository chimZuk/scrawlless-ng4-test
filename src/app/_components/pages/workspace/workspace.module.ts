import { NgModule } from '@angular/core';
import { WorkspaceComponent } from './workspace.component';

import { WorkspaceRouter } from './workspace.router'

import { AlgebraComponent } from '../../workspace-elements/algebra/algebra.component';

import { SharedModule } from '../../../_modules/shared/shared.module'
import { HomeworkDataService } from '../../../_services/homework-data/homework-data.service';

import { SafeHTML } from "../../../_pipes/safehtml.pipe";

import { ColumnCountDialogComponent } from './../../dialogs/workspace-dialogs/column-count-dialog/column-count-dialog.component';


@NgModule({
  imports: [
    WorkspaceRouter,
    SharedModule
  ],
  declarations: [
    WorkspaceComponent,
    AlgebraComponent,
    SafeHTML,
    ColumnCountDialogComponent
  ],
  providers: [
    AlgebraComponent,
    HomeworkDataService
  ],  
  entryComponents: [
    ColumnCountDialogComponent
  ]
})
export class WorkspaceModule { }
