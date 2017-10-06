import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from "./index.component";

const INDEX_ROUTER: Routes = [
    {
        path: '',
        component: IndexComponent
    }
];

export const IndexRouter = RouterModule.forChild(INDEX_ROUTER);