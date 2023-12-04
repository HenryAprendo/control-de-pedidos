import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { products } from '../../../../data/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-new-order',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './create-new-order.component.html',
  styles: ``
})
export class CreateNewOrderComponent {

  listOfProducts = products.slice();

  ordersForm!: FormGroup;

  private fb = inject(FormBuilder);

  constructor(){
    this.ordersForm = this.buildForm();
  }

  private buildForm(){
    return this.fb.group({
      apartment: ['T',[Validators.required]],
      empCheese: [0],
      empMeat: [0],
      cbñCheese: [0],
      cbñMeat: [0],
      potatoes: [0],
      cornCake: [0],
    })
  }

}














