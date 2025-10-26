import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ArticleModel, ArticleSlugModel, ArticlesModel } from '../models/article.model';
import { Observable } from 'rxjs';
import { CommentPayloadModel, CommentsModel } from '../models/comments.model';

@Injectable()
export class Articles {
  protected readonly _http = inject(HttpClient);

  #articlesBasePath = 'articles';
  #articlesUrl = `${environment.basePath}/${this.#articlesBasePath}`;

  getArticles(): Observable<ArticlesModel> {
    return this._http.get<ArticlesModel>(this.#articlesUrl);
  }

  getArticle(slug: string): Observable<ArticleSlugModel> {
    return this._http.get<ArticleSlugModel>(`${this.#articlesUrl}/${slug}`);
  }

  getArticleComments(slug: string): Observable<CommentsModel> {
    return this._http.get<CommentsModel>(`${this.#articlesUrl}/${slug}/comments`);
  }

  favoriteArticle(slug: string): Observable<ArticleSlugModel> {
    return this._http.post<ArticleSlugModel>(`${this.#articlesUrl}/${slug}/favorite`,'');
  }

  unfavoriteArticle(slug: string): Observable<ArticleSlugModel> {
    return this._http.delete<ArticleSlugModel>(`${this.#articlesUrl}/${slug}/favorite`);
  }

  addComment(slug: string, comment: CommentPayloadModel): Observable<CommentsModel> {
    return this._http.post<CommentsModel>(`${this.#articlesUrl}/${slug}/comments`, {
      comment,
    });
  }

  deleteComment(slug:string,id:number): Observable<CommentsModel> {
    return this._http.delete<CommentsModel>(`${this.#articlesUrl}/${slug}/comments/${id}`);
  }
}
