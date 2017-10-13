import { Routes, RouterModule } from '@angular/router';
import { ListsComponent } from "./lists.component";

const LISTS_ROUTER: Routes = [
    {
        path: '',
        component: ListsComponent,
        children: [
            {
                path: '',
                loadChildren: './student-lists/student-lists.module#StudentListsModule'
            }
        ]
    }
];

export const ListsRouter = RouterModule.forChild(LISTS_ROUTER);