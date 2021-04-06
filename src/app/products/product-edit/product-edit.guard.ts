import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  
  canDeactivate(component: ProductEditComponent, 
    currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, 
    nextState?: RouterStateSnapshot): boolean {
      console.log("dirty " + component.isDirty);
      
    if(component.isDirty){
      const productName = component.product.productName || 'New product';
      return confirm(`Seguro que quiere salir y perder los cambios de ${ productName }?`);
    }
    return true;
  }
  
}
