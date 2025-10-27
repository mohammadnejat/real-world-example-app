import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { of, pipe, switchMap, tap } from 'rxjs';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestState,
} from '../../../core/states/request-state.feature';
import { computed, inject } from '@angular/core';
import { Articles } from '../../../core/services/articles';
import { tapResponse } from '@ngrx/operators';
import { ArticleSingleSlugModel, ArticlesModel } from '../../../core/models/article.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationStore } from '../../../authentication/authentication.store';


interface HomeStoreModel {
  articles: ArticleSingleSlugModel[];
  articlesCount: number;
}

const initialState: HomeStoreModel = {
  articles: [],
  articlesCount: 0,
};

export const HomeStore = signalStore(
  withState(initialState),
  withRequestState({ prefix: 'articles' }),
  withComputed((store,authenticationStore = inject(AuthenticationStore)) => ({
    vm: computed(() => ({
      popularTags: computed(() => {
        const tags = store
          .articles()
          .sort((a, b) => b.favoritesCount - a.favoritesCount)
          .map((article) => article.tagList)
          .flat();
        return [...new Set(tags)];
      }),

      myArticles: computed(() => {
        return store.articles().filter((article) => article.author.username === authenticationStore.user()?.username);
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
        tap(() => patchState(store, setPending('articles'))),
        switchMap((slug) =>
          articles.favoriteArticle(slug).pipe(
            tapResponse({
              next: (article) => {
                patchState(
                  store,
                  {
                    articles: store.articles().map((art) => {
                      return art.slug === article.article.slug ? article.article : art;
                    }),
                  },
                  setFulfilled('articles')
                );
              },
              error: (error: HttpErrorResponse) => setError('articles', error),
            })
          )
        )
      )
    ),
    unfavoriteArticle: rxMethod<string>(
      pipe(
        tap(() => patchState(store, setPending('articles'))),
        switchMap((slug) =>
          articles.unfavoriteArticle(slug).pipe(
            tapResponse({
              next: (article) => {
                patchState(
                  store,
                  {
                    articles: store.articles().map((art) => {
                      return art.slug === article.article.slug ? article.article : art;
                    }),
                  },
                  setFulfilled('articles')
                );
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
