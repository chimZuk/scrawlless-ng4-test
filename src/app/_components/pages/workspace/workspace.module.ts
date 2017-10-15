import { NgModule } from '@angular/core';
import { WorkspaceComponent } from './workspace.component';

import { WorkspaceRouter } from './workspace.router'

import { SharedModule } from '../../../_modules/shared/shared.module'

@NgModule({
  imports: [
    WorkspaceRouter,
    SharedModule
  ],
  declarations: [
    WorkspaceComponent
  ],
  providers: []
})
export class WorkspaceModule { }
