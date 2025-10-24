export interface ArticlesModel {
  articles: ArticleModel[];
  articlesCount: number;
}

export interface ArticleSlugModel {
  article: ArticleModel;
}

export interface ArticleModel {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorModel;
  body?: string;
}

export interface AuthorModel {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
