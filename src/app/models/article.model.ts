export interface Article {
  id:number;
  name:string;
  description:string;
  price:number;
  image:string;
  isSelected:boolean;
  amount?:number;
}

export interface UpdateArticleDto extends Partial<Omit<Article, 'id'>> {

}
