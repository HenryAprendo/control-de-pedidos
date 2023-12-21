import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'works',
    pathMatch: 'full'
  },
  {
    path: 'works',
    loadChildren: () => import('./modules/works/works.routes').then(m => m.worksRoutes)
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/product/product.routes').then(m => m.routes),
  }

];
