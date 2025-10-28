export interface ArticlesModel {
  articles: ArticleSingleSlugModel[];
  articlesCount: number;
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
}

export interface ArticleSlugModel {
  article: ArticleSingleSlugModel;
}

export interface ArticleSingleSlugModel {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorModel;
}

export interface AuthorModel {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ArticlePayloadModel {
  tag?: string;
  author?: string;
  favorited?: boolean;
}
