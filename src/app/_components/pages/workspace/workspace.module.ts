import { NgModule } from '@angular/core';
import { WorkspaceComponent } from './workspace.component';

import { WorkspaceRouter } from './workspace.router'

import { RootComponent } from '../../workspace-elements/root/root.component';

import { SharedModule } from '../../../_modules/shared/shared.module'

@NgModule({
  imports: [
    WorkspaceRouter,
    SharedModule
  ],
  declarations: [
    WorkspaceComponent,
    RootComponent
  ],
  providers: [
    RootComponent
  ]
})
export class WorkspaceModule { }
