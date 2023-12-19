import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { images } from '../../product-images'
import { Article } from '../../../../models/article.model';
import { ProductService } from '../../../../services/product.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styles: ``
})
export class EditProductComponent implements OnInit {

  private route = inject(ActivatedRoute);

  private productService = inject(ProductService);

  private fb = inject(FormBuilder);

  editForm!:FormGroup;

  productImages = images.slice();

  private productId = signal(-1);

  constructor(){
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        let id = params.get('id');
        if(id){
          this.productId.set(Number(id));
          return this.productService.findOne(Number(id));
        }
        return of(null);
      })
    ).subscribe(dta => {
      if(dta){
        this.editForm.patchValue(dta);
      }
    });
  }

  updateProduct(){
    if(this.editForm.valid){
      const id = this.productId();
      let data: Article = {
        id: id,
        name: this.nameField?.value,
        description: this.descriptionField?.value,
        price: this.priceField?.value,
        image: this.imageField?.value,
        isSelected:false
      };
      this.productService.update(id,data);
    }
    else {
      this.editForm.markAllAsTouched();
    }
  }

  private buildForm(){
    this.editForm = this.fb.group({
      name: ['',[Validators.required]],
      description: ['',[Validators.required]],
      price: [0,[Validators.required]],
      image:['',]
    });
  }

  get nameField(){
    return this.editForm.get('name');
  }

  get descriptionField(){
    return this.editForm.get('description');
  }

  get priceField(){
    return this.editForm.get('price');
  }

  get imageField(){
    return this.editForm.get('image');
  }


}
