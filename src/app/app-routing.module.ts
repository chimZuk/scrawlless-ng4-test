import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';

export const router: Routes = [
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        loadChildren: './_components/pages/index/index.module#IndexModule'
    },
    {
        path: 'dashboard',
        loadChildren: './_components/pages/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
    },
    { 
        path: 'homework/:id',
        loadChildren: './_components/pages/workspace/workspace.module#WorkspaceModule',
        canActivate: [AuthGuard]
    }
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(router);