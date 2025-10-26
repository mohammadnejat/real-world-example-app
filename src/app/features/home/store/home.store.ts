import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestState,
} from '../../../core/states/request-state.feature';
import { computed, inject } from '@angular/core';
import { Articles } from '../../../core/services/articles';
import { tapResponse } from '@ngrx/operators';
import { ArticleModel, ArticlesModel } from '../../../core/models/article.model';
import { HttpErrorResponse } from '@angular/common/http';

interface HomeStoreModel {
  articles: ArticleModel[];
  articlesCount: number;
}

const initialState: HomeStoreModel = {
  articles: [],
  articlesCount: 0,
};

export const HomeStore = signalStore(
  withState(initialState),
  withRequestState({ prefix: 'articles' }),
  withComputed((store) => ({
    vm: computed(() => ({
      popularTags: computed(() => {
        const tags = store
          .articles()
          .sort((a, b) => b.favoritesCount - a.favoritesCount)
          .map((article) => article.tagList)
          .flat();
        return [...new Set(tags)];
      }),
      ...store,
    })),
  })),
  withMethods((store, articles = inject(Articles)) => ({
    getArticles: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending('articles'))),
        switchMap(() =>
          articles.getArticles().pipe(
            tapResponse({
              next: (article) => {
                const { articles, articlesCount } = article;
                patchState(store, { articles, articlesCount }, setFulfilled('articles'));
              },
              error: (error: HttpErrorResponse) => setError('articles', error),
            })
          )
        )
      )
    ),
    favoriteArticle: rxMethod<string>(
      pipe(
        tap((slug) => patchState(store, setPending('articles'))),
        switchMap((slug) =>
          articles.favoriteArticle(slug).pipe(
            tapResponse({
              next: (article) => {
                console.log(article);
                
              },
              error: (error: HttpErrorResponse) => setError('articles', error),
            })
          )
        )
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.getArticles();
    },
  })
);
