import { Product } from '../models/product.model';

export const products:Product[] = [
  {
    id: 1,
    name: 'Empanadas',
    price: 1500,
    controlNameCheese: 'empCheese',
    controlNameMeat: 'empMeat'
  },
  {
    id: 2,
    name: 'Caribañolas',
    price: 2000,
    controlNameCheese: 'cbñCheese',
    controlNameMeat: 'cbñMeat'
  },
  {
    id: 3,
    name: 'Papas rellenas',
    price: 2000,
    controlName: 'potatoes'
  },
  {
    id: 4,
    name: 'Arepas de anis',
    price: 1500,
    controlName: 'cornCake'
  },
]
