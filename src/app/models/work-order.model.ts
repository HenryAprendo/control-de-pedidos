import { Orders } from './orders.model';

export interface WorkOrder {
  workOrderNumber:number;
  orderList: Orders[];
}
