import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { ProductDetailComponent } from "./product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductListComponent } from "./product-list.component";

import { ProductResolver } from './product-resolver.service';
import { ProductEditGuard } from './product-edit/product-edit.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ProductListComponent
            },
            {
                path: ':id',
                component: ProductDetailComponent,
                resolve: { resolvedData: ProductResolver }
            },
            {
                path: ':id/edit',
                component: ProductEditComponent,
                canDeactivate: [ProductEditGuard],
                resolve: { resolvedData: ProductResolver },
                children: [
                    { path: '', redirectTo: 'info', pathMatch: 'full' },
                    { path: 'info', component: ProductEditInfoComponent },
                    { path: 'tags', component: ProductEditTagsComponent }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ProductRoutingModule { }