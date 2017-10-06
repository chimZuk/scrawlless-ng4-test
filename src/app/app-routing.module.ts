import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const router: Routes = [
    {
        path: '',
        loadChildren: './_components/pages/index/index.module#IndexModule'
    },
    {
        path: 'dashboard',
        loadChildren: './_components/pages/dashboard/dashboard.module#DashboardModule'
    }
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(router);