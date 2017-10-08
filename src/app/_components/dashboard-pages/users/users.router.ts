import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from "./users.component";

const USERS_ROUTER: Routes = [
    {
        path: '',
        component: UsersComponent
    }
];

export const UsersRouter = RouterModule.forChild(USERS_ROUTER);