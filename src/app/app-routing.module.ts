import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from "./page-not-found.component";
import { WelcomeComponent } from "./home/welcome.component";
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';


const routes = [
    { path: 'welcome', component: WelcomeComponent },
    {
        path: 'products',
        loadChildren: () => import('./products/product.module').then(m => m.ProductModule),
        data: { preload: true },
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: SelectiveStrategy }),
    ],
    exports: [
        RouterModule
    ]},
)
export class AppRoutingModule { }