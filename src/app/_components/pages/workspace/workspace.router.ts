import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from "./workspace.component";

const WORKSPACE_ROUTER: Routes = [
    {
        path: '',
        component: WorkspaceComponent
    }
];

export const WorkspaceRouter = RouterModule.forChild(WORKSPACE_ROUTER);