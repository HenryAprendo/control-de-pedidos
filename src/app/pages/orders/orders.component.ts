import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { products } from '../../data/products';
import { map } from 'rxjs';
import { WorkOrderService } from '../../services/work-order.service';
import { Orders } from '../../models/orders.model';
import { UniqueIdService } from '../../services/unique-id.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styles: ``
})
export class OrdersComponent implements OnInit {

  listOfProducts = products.slice();

  ordersForm!: FormGroup;

  private fb = inject(FormBuilder);

  private route = inject(ActivatedRoute);

  private workOrderService = inject(WorkOrderService);

  private uniqueId = inject(UniqueIdService);

  orderActual!:number;

  orderList: Orders[] = [];

  showOrderForm = signal(false);

  constructor(){
    this.ordersForm = this.buildForm();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(param => Number(param.get('order-number')))
    ).subscribe(value => {
      this.orderActual = value;
      this.workOrderService.updateOrderList(value);
    });

    this.workOrderService.orderList$
      .subscribe(data => {
        this.orderList = data;
      });
  }

  onShowForm(){
    this.showOrderForm.update(state => !state);
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
    });
  }

  addNewOrders(){
    if(this.ordersForm.valid){
      this.workOrderService.addNewOrders(this.orderActual, new Orders(
        this.uniqueId.newOrderId(),
        this.ordersForm.get('apartment')?.value,
        this.ordersForm.get('empCheese')?.value,
        this.ordersForm.get('empMeat')?.value,
        this.ordersForm.get('cbñCheese')?.value,
        this.ordersForm.get('cbñMeat')?.value,
        this.ordersForm.get('potatoes')?.value,
        this.ordersForm.get('cornCake')?.value,
      ));
      this.ordersForm.reset({
        apartment: 'T',
        empCheese: 0,
        empMeat: 0,
        cbñCheese: 0,
        cbñMeat: 0,
        potatoes: 0,
        cornCake: 0,
      });
    }
  }


}
