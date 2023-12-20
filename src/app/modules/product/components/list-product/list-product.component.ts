import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Article } from '../../../../models/article.model';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-product.component.html',
  styles: ``
})
export class ListProductComponent implements OnInit {

  private menuService = inject(MenuService);

  private productService = inject(ProductService);

  products:Article[] = [];

  ngOnInit(): void {
    this.productService.findAll()
      .subscribe(data => {
        this.products = data;
      })
  }

  removeProduct(id:number){
    this.productService.delete(id);
  }

  addToMenu(data:Article){
    this.menuService.save(data);
  }

  removeFromMenu(data:Article){
    this.menuService.remove(data);
  }

}
