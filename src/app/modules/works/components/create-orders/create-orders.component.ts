import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MenuService } from '../../../../services/menu.service';
import { Article } from '../../../../models/article.model';
import { Orders } from '../../../../models/orders.model';
import { numberOfTowers, numberOfApartment } from '../../../../data/locations';
import { UniqueIdService } from '../../../../services/unique-id.service';
import { WorkOrderService } from '../../../../services/work-order.service';

@Component({
  selector: 'app-create-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-orders.component.html',
  styles: ``
})
export class CreateOrdersComponent implements OnInit {

  numTowers = numberOfTowers.slice();

  numApartments = numberOfApartment.slice();

  private workOrderService = inject(WorkOrderService);

  private uniqueId = inject(UniqueIdService);

  private fb = inject(FormBuilder);

  private route = inject(ActivatedRoute);

  private menuService = inject(MenuService);

  menuProducts: Article[] = [];

  private numberOrder = signal(0);

  readNumOrder = computed(() => this.numberOrder());

  formLocations!:FormGroup;

  orderProducts:Article[] = [];

  constructor(){
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.parent?.paramMap
      .subscribe( params => {
        this.numberOrder.set(Number(params.get('orderNumber')));
      });

    this.menuProducts = this.menuService.retrieve();
  }

  private buildForm(){
    this.formLocations = this.fb.group({
      tower: [1,[Validators.required]],
      apartment: [101,[Validators.required]]
    });
  }

  saveOrders(){
    if(this.formLocations.valid){

      const products = this.menuProducts.filter(item => item.amount! > 0);

      let data:Orders = {
        id: this.uniqueId.newOrderId(),
        tower: this.towerField?.value,
        apartment: this.apartmentField?.value,
        listOrders: [...products]
      }

      this.workOrderService.addNewOrders(this.readNumOrder(),data);

    }
  }

  get towerField(){
    return this.formLocations.get('tower');
  }

  get apartmentField(){
    return this.formLocations.get('apartment');
  }

  incrementAmountProduct(id:number){
    const index = this.menuProducts.findIndex(item => item.id === id);
    if(index >= 0) {
      this.menuProducts[index].amount! += 1;
    }
  }

  decrementAmountProduct(id:number){
    const index = this.menuProducts.findIndex(item => item.id === id);
    if(index >= 0) {
      if(this.menuProducts[index].amount! > 0){
        this.menuProducts[index].amount! -= 1;
      }
      else {
        this.menuProducts[index].amount! = 0;
      }
    }
  }



}








