import { Routes, RouterModule } from '@angular/router';
import { StudentListsComponent } from "./student-lists.component";

const STUDENTLISTS_ROUTER: Routes = [
    {
        path: '',
        component: StudentListsComponent
    }
];

export const StudentListsRouter = RouterModule.forChild(STUDENTLISTS_ROUTER);