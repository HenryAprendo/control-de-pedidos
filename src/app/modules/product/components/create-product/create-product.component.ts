import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { images } from '../../product-images'
import { CommonModule } from '@angular/common';
import { Article } from '../../../../models/article.model';
import { UniqueIdService } from '../../../../services/unique-id.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styles: ``
})
export class CreateProductComponent {

  private productService = inject(ProductService);

  private uniqueId = inject(UniqueIdService);

  private fb = inject(FormBuilder);

  productForm!:FormGroup;

  productImages = images.slice();

  constructor(){
    this.buildForm();
  }

  saveNewProduct(){
    if(this.productForm.valid){
      let data: Article = {
        id: this.uniqueId.newProductId(),
        name: this.nameField?.value,
        description: this.descriptionField?.value,
        price: this.priceField?.value,
        image: this.imageField?.value,
        isSelected:false
      };

      this.productService.addProduct(data);
    }
    else {
      this.productForm.markAllAsTouched();
    }
  }

  private buildForm(){
    this.productForm = this.fb.group({
      name: ['',[Validators.required]],
      description: ['',[Validators.required]],
      price: [0,[Validators.required]],
      image:['',]
    });
  }

  get nameField(){
    return this.productForm.get('name');
  }

  get descriptionField(){
    return this.productForm.get('description');
  }

  get priceField(){
    return this.productForm.get('price');
  }

  get imageField(){
    return this.productForm.get('image');
  }



}








