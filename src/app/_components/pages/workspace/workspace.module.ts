import { NgModule } from '@angular/core';
import { WorkspaceComponent } from './workspace.component';

import { WorkspaceRouter } from './workspace.router'

import { AlgebraComponent } from '../../workspace-elements/algebra/algebra.component';

import { SharedModule } from '../../../_modules/shared/shared.module'

@NgModule({
  imports: [
    WorkspaceRouter,
    SharedModule
  ],
  declarations: [
    WorkspaceComponent,
    AlgebraComponent
  ],
  providers: [
    AlgebraComponent
  ]
})
export class WorkspaceModule { }
