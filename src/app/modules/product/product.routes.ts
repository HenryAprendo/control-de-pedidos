import { Route } from "@angular/router";
import { HomeProductComponent } from './components/home-product/home-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

export const routes: Route[] = [
  {
    path: '',
    component: HomeProductComponent,
    children: [
      {
        path: 'create-product',
        component: CreateProductComponent
      },
    ]
  },

]
