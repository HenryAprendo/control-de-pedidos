import { Route } from "@angular/router";
import { HomeProductComponent } from './components/home-product/home-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';

export const routes: Route[] = [
  {
    path: '',
    component: HomeProductComponent,
    children: [
      {
        path: '',
        redirectTo: 'list-product',
        pathMatch: 'full'
      },
      {
        path:'list-product',
        component: ListProductComponent
      },
      {
        path: 'create-product',
        component: CreateProductComponent
      },
    ]
  },

]
