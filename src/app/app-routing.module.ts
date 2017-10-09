import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';

export const router: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
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
    }
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(router);