import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Orders } from '../../../../models/orders.model';
import { WorkOrderService } from '../../../../services/work-order.service';
import { WorkOrder } from '../../../../models/work-order.model';
import { CommonModule } from '@angular/common';
import { Article } from '../../../../models/article.model';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-orders.component.html',
  styles: ``
})
export class ListOrdersComponent implements OnInit {

  private route = inject(ActivatedRoute);

  private workOrderService = inject(WorkOrderService);

  orderNumber!:number;

  ordersProduct!:Orders[];

  orders!:WorkOrder;

  total:number = 0;

  ngOnInit(): void {
    this.route.parent?.paramMap
      .subscribe(params => this.orderNumber = Number(params.get('orderNumber')));

    const data = this.workOrderService.findOrderList(this.orderNumber);
    if(data !== null){
      this.ordersProduct = [...data.orderList];
      this.orders = {...data};
      this.total = this.calculateTotalProduction();
    }
  }

  calculateTotalPerOrder(products:Article[]){
    let total = products.map(item => item.amount! * item.price)
                        .reduce((acc,act) => acc + act);
    return total;
  }

  private calculateTotalProduction(){
    const products = this.ordersProduct.flatMap(product => product.listOrders);
    const multiplyAmountByPrice = products.map(item => item.amount! * item.price);
    const total = multiplyAmountByPrice.reduce((previuesValue,currentValue) => previuesValue + currentValue);
    return total;
  }

}





