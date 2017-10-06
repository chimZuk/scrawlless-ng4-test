import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './_components/pages/index/index.component';

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes)
