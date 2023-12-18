import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { images } from '../../product-images'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styles: ``
})
export class CreateProductComponent {

  private fb = inject(FormBuilder);

  productForm!:FormGroup;

  productImages = images.slice();

  constructor(){
    this.buildForm();
  }

  saveNewProduct(){
    if(this.productForm.valid){
      console.log(this.productForm.value);
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








