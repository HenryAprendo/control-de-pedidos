import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { WorkOrderService } from '../../../../services/work-order.service';
import { Orders } from '../../../../models/orders.model';
import { numberOfApartment, numberOfTowers } from '../../../../data/locations';
import { MenuService } from '../../../../services/menu.service';
import { Article } from '../../../../models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-order.component.html',
  styles: ``
})
export class EditOrderComponent implements OnInit {

  numTowers = numberOfTowers.slice();

  numApartments = numberOfApartment.slice();

  private route = inject(ActivatedRoute);

  private workOrderService = inject(WorkOrderService);

  private fb = inject(FormBuilder);

  private menuService = inject(MenuService);

  menuProducts: Article[] = [];

  ordersNumber!:number;

  product!:Orders;

  formEditLocations!: FormGroup;

  constructor(){
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.parent?.paramMap
      .subscribe(params => this.ordersNumber = Number(params.get('orderNumber')) );

    this.menuProducts = this.menuService.retrieve();

    this.route.paramMap.pipe(
      switchMap(params => {
        let id = Number(params.get('id'));
        return of(this.workOrderService.findOrder(this.ordersNumber,id));
      })
    )
    .subscribe(dta => {

      if(dta){
        this.product = dta;
        this.formEditLocations.setValue({
          tower: dta.tower,
          apartment: dta.apartment
        });

        this.menuProducts = this.updateMenuProducts(this.menuService.retrieve(),dta.listOrders);
      }

    });


  }

  private buildForm(){
    this.formEditLocations = this.fb.group({
      tower: [1,[Validators.required]],
      apartment: [101,[Validators.required]]
    });
  }

  get towerField(){
    return this.formEditLocations.get('tower');
  }

  get apartmentField(){
    return this.formEditLocations.get('apartment');
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

  private updateMenuProducts(originalProductMenu:Article[], orderProducts:Article[]){
    let updatedProductMenu:Article[] = [];
    originalProductMenu.forEach(product => {
      let data = orderProducts.find(item => item.id === product.id);
      if(data !== undefined){
        updatedProductMenu.push({...data});
      } else {
        updatedProductMenu.push({...product});
      }
    });

    return updatedProductMenu;
  }

}








