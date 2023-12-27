import { Injectable, inject } from '@angular/core';
import { WorkOrder } from '../models/work-order.model';
import { BehaviorSubject } from 'rxjs';
import { UniqueIdService } from '../services/unique-id.service';
import { StoreWorkOrderService } from '../services/store-work-order.service';
import { Orders } from './../models/orders.model';

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

  findOrderList(orderNumber:number){
    const index = this.workOrders.findIndex(item => item.workOrderNumber === orderNumber);
    if(index >= 0){
      const data = this.workOrders[index];
      return data;
    }
    return null;
  }

  createNewWorkOrder(){
    let workOrderActual = this.uniqueId.newWorkOrderId();

    let data:WorkOrder = {
      workOrderNumber: workOrderActual,
      createAt: new Date(),
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

  findOrder(orderNum:number, id:number){
    const position = this.workOrders.findIndex(item => item.workOrderNumber === orderNum);
    if(position >= 0){
      const data = this.workOrders[position];
      const index = data.orderList.findIndex(art => art.id === id);
      if(index >= 0){
        let response:Orders = data.orderList[index];
        return {...response} as Orders;
      }
    }
    return null;
  }

  updateOrder(orderNum:number, id:number, editedOrder: Orders){
    const position = this.workOrders.findIndex(item => item.workOrderNumber === orderNum);
    if(position >= 0){
      const data = this.workOrders[position];
      const index = data.orderList.findIndex(art => art.id === id);
      if(index >= 0){
        data.orderList[index] = {...editedOrder}
        this.storeWorkOrder.saveListWorkOrder(this.workOrders);
      }
    }
  }

  updateOrderList(orderNumber:number){
    let index = this.workOrders.findIndex(item => item.workOrderNumber === orderNumber);
    if(index >= 0) {
      this.orderList.next(this.workOrders[index].orderList);
    }
  }


}









