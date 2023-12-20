import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class StoreMenuService {

  constructor() { }

  saveMenuProducts(data:Article[]){
    localStorage.setItem('menuProducts',JSON.stringify(data));
  }

  getMenuProducts(){
    const data = localStorage.getItem('menuProducts');
    let menuProducts = data !== null ? JSON.parse(data) as Article[] : [];
    return menuProducts;
  }

}
