import { Route } from "@angular/router";
import { HomeWorkComponent } from './components/home-work/home-work.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { CreateOrdersComponent } from './components/create-orders/create-orders.component';

export const worksRoutes: Route[] = [
  {
    path: '',
    component: HomeWorkComponent,
  },
  {
    path: 'orders/:orderNumber',
    component: OrdersComponent,
    children: [
      {
        path: '',
        component: ListOrdersComponent
      },
      {
        path: 'new-orders',
        component: CreateOrdersComponent
      }
    ]
  }
];
