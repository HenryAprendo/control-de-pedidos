import { Routes } from '@angular/router';
import { WorkPerDayComponent } from './pages/work-per-day/work-per-day.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  },
  {
    path: 'work-per-day',
    component: WorkPerDayComponent
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.routes').then(m=>m.routes)
  }
];
