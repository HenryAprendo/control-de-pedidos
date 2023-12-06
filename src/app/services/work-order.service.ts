import { Injectable, inject, signal } from '@angular/core';
import { WorkOrder } from '../models/work-order.model';
import { BehaviorSubject } from 'rxjs';
import { Orders } from '../models/orders.model';
import { UniqueIdService } from '../services/unique-id.service';
import { StoreWorkOrderService } from '../services/store-work-order.service';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  private storeWorkOrder = inject(StoreWorkOrderService);

  private uniqueId = inject(UniqueIdService);

  workOrders:WorkOrder[] = [];

  private orderList = new BehaviorSubject<Orders[]>([]);
  orderList$ = this.orderList.asObservable();

  constructor(){
    this.workOrders = this.storeWorkOrder.getListWOrkOrder();
  }

  createNewWorkOrder(){
    let workOrderActual = this.uniqueId.newWorkOrderId();

    let data:WorkOrder = {
      workOrderNumber: workOrderActual,
      orderList: []
    }

    let position = this.workOrders.push(data);
    this.storeWorkOrder.saveListWorkOrder(this.workOrders);

    this.orderList.next(this.workOrders[position-1].orderList);

    return workOrderActual;
  }

  addNewOrders(orderNumber:number,data:Orders){
    let index = this.workOrders.findIndex(item => item.workOrderNumber === orderNumber);

    if(index >= 0){
      this.workOrders[index].orderList.push(data);
      this.orderList.next(this.workOrders[index].orderList);

      this.storeWorkOrder.saveListWorkOrder(this.workOrders);
    }
  }

  updateOrderList(orderNumber:number){
    let index = this.workOrders.findIndex(item => item.workOrderNumber === orderNumber);
    if(index >= 0) {
      this.orderList.next(this.workOrders[index].orderList);
    }
  }


}









