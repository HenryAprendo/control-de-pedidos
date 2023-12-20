import { Injectable, inject } from '@angular/core';
import { Article } from '../models/article.model';
import { StoreMenuService } from '../services/store-menu.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private storeMenu = inject(StoreMenuService);

  private menuProducts:Article[] = [];

  constructor() {
    this.menuProducts = this.storeMenu.getMenuProducts();
  }

  save(data:Article){
    if(!this.validateExists(data.id)){
      this.menuProducts.push(data);
      this.storeMenu.saveMenuProducts(this.menuProducts);
    }
  }

  remove(data:Article){
    if(this.validateExists(data.id)){
      const index = this.menuProducts.findIndex(item => item.id === data.id);
      if(index >= 0){
        this.menuProducts.splice(index,1);
      }
      this.storeMenu.saveMenuProducts(this.menuProducts);
    }
  }

  private validateExists(id:number): boolean {
    let exists = false;
    this.menuProducts.forEach(item => {
      if(item.id === id){
        exists = true
      }
    });
    return exists;
  }


}
