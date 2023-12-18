import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class StoreProductService {

  constructor() { }

  saveListArticle(data:Article[]){
    localStorage.setItem('listArticle',JSON.stringify(data));
  }

  getListArticle(){
    const data = localStorage.getItem('listArticle');
    let listArticle = data !== null ? JSON.parse(data) as Article[] : [];
    return listArticle;
  }

}
