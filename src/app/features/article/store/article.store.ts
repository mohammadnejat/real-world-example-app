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
import { ArticleSingleSlugModel } from '../../../core/models/article.model';
import { CommentModel, CommentPayloadModel } from '../../../core/models/comments.model';
import { AuthenticationStore } from '../../../authentication/authentication.store';
import { ArticleForm } from '../article.form';

interface ArticleStoreModel {
  article: ArticleSingleSlugModel | null;
  comments: CommentModel[];
}

const initialState: ArticleStoreModel = {
  article: null,
  comments: [],
};

export const ArticleStore = signalStore(
  withState(initialState),
  withRequestState({ prefix: 'article' }),
  withRequestState({ prefix: 'articleComments' }),
  withRouteParams(({ slug }) => ({ slug })),
  withComputed((store, authenticationStore = inject(AuthenticationStore)) => ({
    vm: computed(() => ({
      isUserArticle: computed(
        () => store.article()?.author?.username === authenticationStore.user()?.username
      ),
      isUserComment: computed(
        () => store.comments()?.find((comment) => comment.author.username === authenticationStore.user()?.username)
      ),
      ...store,
    })),
  })),
  withMethods((store, articles = inject(Articles), articleForm = inject(ArticleForm)) => ({
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

    getArticleComments: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending('articleComments'))),
        switchMap(() =>
          articles.getArticleComments(store.slug() as string).pipe(
            tapResponse({
              next: (comments) =>
                patchState(store, { comments: comments.comments }, setFulfilled('articleComments')),
              error: (error: HttpErrorResponse) =>
                patchState(store, setError('articleComments', error)),
            })
          )
        )
      )
    ),

    addComment: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending('articleComments'))),
        switchMap(() => {
          
          const payload: CommentPayloadModel = {
            comment: {
              body:articleForm.form.value.comment
            },
          };
          return articles.addComment(store.slug(), payload).pipe(
            tapResponse({
              next: (comments) =>
                patchState(store, { comments: comments.comments }, setFulfilled('articleComments')),
              error: (error: HttpErrorResponse) =>
                patchState(store, setError('articleComments', error)),
            })
          );
        })
      )
    ),

    deleteComment: rxMethod<number>(
      pipe(
        tap(() => patchState(store, setPending('articleComments'))),
        switchMap((id) =>
          articles.deleteComment(store.slug(), id).pipe(
            tapResponse({
              next: (comments) =>
                patchState(store, { comments: comments.comments }, setFulfilled('articleComments')),
              error: (error: HttpErrorResponse) =>
                patchState(store, setError('articleComments', error)),
            })
          )
        )
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.getArticle();
      store.getArticleComments();
    },
  })
);
