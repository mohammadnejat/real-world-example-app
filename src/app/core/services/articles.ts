import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ArticleModel, ArticleSlugModel, ArticlesModel } from '../models/article.model';
import { Observable } from 'rxjs';

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
}
