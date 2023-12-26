import { Article } from "./article.model";

export interface Orders {
  id:number;
  tower: number;
  apartment: number;
  listOrders: Article[];
}
