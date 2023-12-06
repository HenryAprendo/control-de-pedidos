import { Routes } from '@angular/router';
import { WorkPerDayComponent } from './pages/work-per-day/work-per-day.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'work-per-day',
    pathMatch: 'full'
  },
  {
    path: 'work-per-day',
    component: WorkPerDayComponent
  },
  {
    path: 'orders/:order-number',
    component: OrdersComponent
  },

];
