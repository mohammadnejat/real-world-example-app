import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  ArticleModel,
  ArticlePayloadModel,
  ArticleSlugModel,
  ArticlesModel,
  CreateArticlePayloadModel,
} from '../models/article.model';
import { Observable } from 'rxjs';
import { CommentModel, CommentPayloadModel, CommentsModel } from '../models/comments.model';

@Injectable()
export class Articles {
  #http = inject(HttpClient);

  #articlesBasePath = 'articles';
  #articlesUrl = `${environment.basePath}/${this.#articlesBasePath}`;

  getArticles(payload?: ArticlePayloadModel): Observable<ArticlesModel> {
    return this.#http.get<ArticlesModel>(`${this.#articlesUrl}`, { params: { ...payload } });
  }

  getArticle(slug: string): Observable<ArticleSlugModel> {
    return this.#http.get<ArticleSlugModel>(`${this.#articlesUrl}/${slug}`);
  }

  getArticleComments(slug: string): Observable<CommentsModel> {
    return this.#http.get<CommentsModel>(`${this.#articlesUrl}/${slug}/comments`);
  }

  favoriteArticle(slug: string): Observable<ArticleSlugModel> {
    return this.#http.post<ArticleSlugModel>(`${this.#articlesUrl}/${slug}/favorite`, '');
  }

  unfavoriteArticle(slug: string): Observable<ArticleSlugModel> {
    return this.#http.delete<ArticleSlugModel>(`${this.#articlesUrl}/${slug}/favorite`);
  }

  addComment(slug: string, comment: CommentPayloadModel): Observable<CommentModel> {
    return this.#http.post<CommentModel>(`${this.#articlesUrl}/${slug}/comments`, comment);
  }

  deleteComment(slug: string, id: number): Observable<CommentModel> {
    return this.#http.delete<CommentModel>(`${this.#articlesUrl}/${slug}/comments/${id}`);
  }

  createArticle(payload: CreateArticlePayloadModel): Observable<ArticleModel> {
    return this.#http.post<ArticleModel>(`${this.#articlesUrl}`, payload);
  }
}
