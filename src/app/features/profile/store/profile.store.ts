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
import { ArticlePayloadModel, ArticleSingleSlugModel } from '../../../core/models/article.model';
import { CommentModel, CommentPayloadModel } from '../../../core/models/comments.model';
import { AuthenticationStore } from '../../../authentication/authentication.store';

import { Profiles } from '../../../core/services/profiles';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ProfileStoreModel {
  articles: ArticleSingleSlugModel[];
}

const initialState: ProfileStoreModel = {
  articles: [],
};

export const ProfileStore = signalStore(
  withState(initialState),
  withRequestState({ prefix: 'article' }),
  withRouteParams(({ slug }) => ({ slug })),
  withComputed((store, authenticationStore = inject(AuthenticationStore)) => ({
    vm: computed(() => ({
      //   isUserArticle: computed(
      //     () => store.articles()?.author?.username === authenticationStore.user()?.username
      //   ),

      ...store,
    })),
  })),
  withMethods(
    (
      store,
      articles = inject(Articles),
      profiles = inject(Profiles),
      matSnackbar = inject(MatSnackBar),
      authenticationStore = inject(AuthenticationStore)
    ) => ({
      getArticles: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending('article'))),
          switchMap(() => {
            const payload: ArticlePayloadModel = {
              author: authenticationStore.user()?.username,
            };
            return articles.getArticles(payload).pipe(
              tapResponse({
                next: (article) =>
                  patchState(store, { articles: article.articles }, setFulfilled('article')),
                error: (error: HttpErrorResponse) => patchState(store, setError('article', error)),
              })
            );
          })
        )
      ),

      favoriteArticle: rxMethod<string>(
        pipe(
          switchMap((id) =>
            articles.favoriteArticle(id).pipe(
              tapResponse({
                next: (article) => {
                  patchState(store, {
                    articles: store.articles().map((artic) => {
                      if (artic.slug === article.article.slug) {
                        return article.article;
                      }
                      return artic;
                    }),
                  });
                  matSnackbar.open(`you have favorited ${article.article?.title}`, 'Dismiss');
                },
                error: (error: HttpErrorResponse) => {},
              })
            )
          )
        )
      ),

      unfavoriteArticle: rxMethod<string>(
        pipe(
          switchMap((id) =>
            articles.unfavoriteArticle(id).pipe(
              tapResponse({
                next: (article) => {
                  patchState(store, {
                    articles: store.articles().map((artic) => {
                      if (artic.slug === article.article.slug) {
                        return article.article;
                      }
                      return artic;
                    }),
                  });
                  matSnackbar.open(`you have unfavorited ${article.article?.title}`, 'Dismiss');
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
      store.getArticles();
    },
  })
);
