import {Injectable, inject } from '@angular/core';
import {Article } from '../models/article.model';
import { Router } from '@angular/router';
import { StoreProductService } from '../services/store-product.service';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private router = inject(Router);

  private storeProduct = inject(StoreProductService);

  private listArticle: Article[] = [];

  constructor() {
    this.listArticle = this.storeProduct.getListArticle();
  }

  addProduct(data:Article){
    this.listArticle.push({...data});
    this.storeProduct.saveListArticle([...this.listArticle])
    this.router.navigate(['./']);
  }

  getProduct(): Observable<Article[]>{
    return of([...this.listArticle]);
  }

}
