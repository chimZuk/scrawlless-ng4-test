import { NgModule } from '@angular/core';
import { WorkspaceComponent } from './workspace.component';

import { WorkspaceRouter } from './workspace.router'

import { AlgebraComponent } from '../../workspace-elements/algebra/algebra.component';

import { SharedModule } from '../../../_modules/shared/shared.module'
import { HomeworkDataService } from '../../../_services/homework-data/homework-data.service';

import { SafeHTML } from "../../../_pipes/safehtml.pipe";


@NgModule({
  imports: [
    WorkspaceRouter,
    SharedModule
  ],
  declarations: [
    WorkspaceComponent,
    AlgebraComponent,
    SafeHTML
  ],
  providers: [
    AlgebraComponent,
    HomeworkDataService
  ]
})
export class WorkspaceModule { }
