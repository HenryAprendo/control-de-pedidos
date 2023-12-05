import { Injectable, WritableSignal, signal } from '@angular/core';
import { WorkOrder } from '../models/work-order.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  private workOrderNumber = signal(1);

  orders:WorkOrder[] = [];

  constructor(){
    this.workOrderNumber.set(this.getWorkOrderNumber());
  }

  createNewWorkOrder(){
    this.orders.push({
      workOrderNumber: this.workOrderNumber(),
      orderList: []
    });

    let workOrderActual = this.workOrderNumber();

    this.workOrderNumber.update(value => value + 1);
    this.saveWorkOrderNumber();

    return workOrderActual;
  }

  private saveWorkOrderNumber(){
    localStorage.setItem('workOrderNumber',JSON.stringify(this.workOrderNumber()));
  }

  private getWorkOrderNumber(){
   const data = localStorage.getItem('workOrderNumber');
   const initialValue = data !== null ? JSON.parse(data) : '1';
   return parseInt(initialValue);
  }


}









