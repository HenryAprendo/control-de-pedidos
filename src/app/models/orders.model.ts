import { Article } from "./article.model";

export interface Orders {
  id:number;
  tower: string;
  apartment: number;
  listOrders: Article[];
}
