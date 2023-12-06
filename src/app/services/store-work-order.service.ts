import { Injectable } from '@angular/core';
import { WorkOrder } from '../models/work-order.model'

@Injectable({
  providedIn: 'root'
})
export class StoreWorkOrderService {

  constructor() { }

  saveListWorkOrder(data:WorkOrder[]){
    localStorage.setItem('listWorkOrder',JSON.stringify(data));
  }

  getListWOrkOrder(){
    const data = localStorage.getItem('listWorkOrder');
    let listWorkOrder = data !== null ? JSON.parse(data) as WorkOrder[] : [];
    return listWorkOrder;
  }

}
