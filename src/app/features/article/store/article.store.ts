import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withRouteParams } from '@ngrx-traits/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestState,
} from '../../../core/states/request-state.feature';
import { Articles } from '../../../core/services/articles';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleModel } from '../../../core/models/article.model';

interface ArticleStoreModel {
  article: ArticleModel | null;
}

const initialState: ArticleStoreModel = {
  article: null,
};

export const ArticleStore = signalStore(
  withState(initialState),
  withRequestState({ prefix: 'article' }),
  withRouteParams(({ slug }) => ({ slug })),
  withComputed((store) => ({
    vm: computed(() => ({
      ...store,
    })),
  })),
  withMethods((store, articles = inject(Articles)) => ({
    getArticle: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending('article'))),
        switchMap(() =>
          articles.getArticle(store.slug() as string).pipe(
            tapResponse({
              next: (article) =>
                patchState(store, { article: article.article }, setFulfilled('article')),
              error: (error: HttpErrorResponse) => patchState(store, setError('article', error)),
            })
          )
        )
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.getArticle();
    },
  })
);
