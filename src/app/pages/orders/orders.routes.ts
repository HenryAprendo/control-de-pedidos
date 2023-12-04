import { Routes } from '@angular/router';
import { OrdersComponent } from '../orders/orders.component';
import { OrderListComponent } from '../../pages/orders/components/order-list/order-list.component';
import { CreateNewOrderComponent } from '../../pages/orders/components/create-new-order/create-new-order.component';

export const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: '',
        component: OrderListComponent
      },
      {
        path: 'create-new-order',
        component: CreateNewOrderComponent
      }
    ]
  }
];
