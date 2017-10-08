import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from "./devices.component";

const DEVICES_ROUTER: Routes = [
    {
        path: '',
        component: DevicesComponent
    }
];

export const DevicesRouter = RouterModule.forChild(DEVICES_ROUTER);