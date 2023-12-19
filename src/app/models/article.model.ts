export interface Article {
  id:number;
  name:string;
  description:string;
  price:number;
  image:string;
  isSelected:boolean;
}

export interface UpdateArticleDto extends Partial<Omit<Article, 'id'>> {

}
