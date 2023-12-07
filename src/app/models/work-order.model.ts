import { Orders } from './orders.model';

export interface WorkOrder {
  workOrderNumber:number;
  createAt: Date;
  orderList: Orders[];
}
