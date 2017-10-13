import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";

const DASHBOARD_ROUTER: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '', 
                redirectTo: 'lists', 
                pathMatch: 'full'
            },
            {
                path: 'lists',
                loadChildren: '../../dashboard-pages/lists/lists.module#ListsModule'
            },
            {
                path: 'marks',
                loadChildren: '../../dashboard-pages/devices/devices.module#DevicesModule'
            },
            {
                path: 'users',
                loadChildren: '../../dashboard-pages/users/users.module#UsersModule'
            },
            {
                path: 'im',
                loadChildren: '../../dashboard-pages/devices/devices.module#DevicesModule'
            },
            {
                path: 'devices',
                loadChildren: '../../dashboard-pages/devices/devices.module#DevicesModule'
            }
        ]
    }
];

export const DashboardRouter = RouterModule.forChild(DASHBOARD_ROUTER);