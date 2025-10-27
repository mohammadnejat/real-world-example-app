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
import { Profiles } from '../../../core/services/profiles';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      isUserComment: computed(() =>
        store
          .comments()
          ?.find((comment) => comment.author.username === authenticationStore.user()?.username)
      ),
      ...store,
    })),
  })),
  withMethods(
    (
      store,
      articles = inject(Articles),
      articleForm = inject(ArticleForm),
      profiles = inject(Profiles),
      matSnackbar = inject(MatSnackBar)
    ) => ({
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
                  patchState(
                    store,
                    { comments: comments.comments },
                    setFulfilled('articleComments')
                  ),
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
                body: articleForm.form.value,
              },
            };

            return articles.addComment(store.slug(), payload).pipe(
              tapResponse({
                next: (comments) => {
                  patchState(
                    store,
                    { comments: [comments.comment, ...store.comments()] },
                    setFulfilled('articleComments')
                  );
                  articleForm.form.reset();
                  matSnackbar.open('Comment added', 'Dismiss');
                },
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
                 {
                   patchState(
                    store,
                    { comments: [comments.comment, ...store.comments()] },
                    setFulfilled('articleComments')
                  );
                   matSnackbar.open('Comment Deleted', 'Dismiss');
                 },
                error: (error: HttpErrorResponse) =>
                  patchState(store, setError('articleComments', error)),
              })
            )
          )
        )
      ),

      favoriteArticle: rxMethod<void>(
        pipe(
          switchMap(() =>
            articles.favoriteArticle(store.slug()).pipe(
              tapResponse({
                next: (article) => {
                  patchState(store, {
                    article:
                      store.article()?.slug === article.article.slug
                        ? article.article
                        : store.article(),
                  });
                   matSnackbar.open(`you have favorited ${store.article()?.title}`, 'Dismiss');
                },
                error: (error: HttpErrorResponse) => {},
              })
            )
          )
        )
      ),

      unfavoriteArticle: rxMethod<void>(
        pipe(
          switchMap(() =>
            articles.unfavoriteArticle(store.slug()).pipe(
              tapResponse({
                next: (article) => {
                  patchState(store, {
                    article:
                      store.article()?.slug === article.article.slug
                        ? article.article
                        : store.article(),
                  });
                  matSnackbar.open(`you have unfavorited ${store.article()?.title}`, 'Dismiss');
                },
                error: (error: HttpErrorResponse) => {},
              })
            )
          )
        )
      ),

      followUser: rxMethod<string>(
        pipe(
          switchMap((username) =>
            profiles.followUser(username).pipe(
              tapResponse({
                next: (user) => {
                  matSnackbar.open(`you have followed ${user.user.username}`, 'Dismiss');
                },
                error: (error: HttpErrorResponse) => {},
              })
            )
          )
        )
      ),

      unflolowUser: rxMethod<string>(
        pipe(
          switchMap((username) =>
            profiles.followUser(username).pipe(
              tapResponse({
                next: (user) => {
                  matSnackbar.open(`you have unfollowed ${user.user.username}`, 'Dismiss');
                },
                error: (error: HttpErrorResponse) => {},
              })
            )
          )
        )
      ),
    })
  ),
  withHooks({
    onInit(store) {
      store.getArticle();
      store.getArticleComments();
    },
  })
);
