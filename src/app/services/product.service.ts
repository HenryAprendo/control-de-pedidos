import { Injectable, inject } from '@angular/core';
import { Article, UpdateArticleDto } from '../models/article.model';
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
    this.storeProduct.saveListArticle([...this.listArticle]);
    this.router.navigate(['./']);
  }

  findAll(): Observable<Article[]>{
    return of([...this.listArticle]);
  }

  findOne(id:number): Observable<Article|null> {
    const index = this.findIndex(id);
    if(index && index > 0 ){
      const result = this.listArticle[index];
      const data:Article = {...result};
      return of(data);
    } else {
      return of(null);
    }
  }

  update(id:number, data:UpdateArticleDto){
    let newDta = {} as Article;
    console.log(id)

    this.findOne(id).subscribe(res => {
      if(res === null){
        console.log('El producto no existe');
      } else {
        newDta = {...res, ...data };
        const index = this.findIndex(id);
        if(index && index > 0) {
          this.listArticle[index] = {...newDta};
          console.log(this.listArticle[index]);
          this.storeProduct.saveListArticle([...this.listArticle]);
          this.router.navigate(['./']);
        };
      }
    });

  }

  delete(id:number){
    const index = this.findIndex(id);
    if(index && index > 0){
      this.listArticle.splice(index);
      this.storeProduct.saveListArticle([...this.listArticle]);
    }
  }

  private findIndex(id:number): number|null {
    let index = this.listArticle.findIndex(item => item.id === id);
    return index > 0 ? index : null;
  }

}











