import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Article } from '../../../../models/article.model';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [],
  templateUrl: './list-product.component.html',
  styles: ``
})
export class ListProductComponent implements OnInit {

  private productService = inject(ProductService);

  products:Article[] = [];

  ngOnInit(): void {
    this.productService.getProduct()
      .subscribe(data => {
        this.products = data;
      })
  }

}
