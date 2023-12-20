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
    if(this.validateExists(data)){
      this.menuProducts.push(data);
      this.storeMenu.saveMenuProducts(this.menuProducts);
    }
  }

  remove(data:Article){
    if(this.validateExists(data)){
      const index = this.menuProducts.findIndex(item => item.id === data.id);
      if(index > 0) this.menuProducts.splice(index);
      this.storeMenu.saveMenuProducts(this.menuProducts);
    }
  }

  private validateExists(data:Article): boolean {
    return this.menuProducts.includes(data);
  }


}
