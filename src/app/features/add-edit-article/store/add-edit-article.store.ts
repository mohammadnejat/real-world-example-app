import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestState,
} from '../../../core/states/request-state.feature';
import { ArticlePayloadModel, CreateArticlePayloadModel } from '../../../core/models/article.model';
import { AddEditArticleFormService } from '../add-edit-article-form.service';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { Articles } from '../../../core/services/articles';
import { HttpErrorResponse } from '@angular/common/http';

export const AddEditArticleStore = signalStore(
  withState([]),
  withRequestState({ prefix: 'article' }),
  withComputed((store) => ({})),
  withMethods(
    (
      store,
      addEditArticleFormService = inject(AddEditArticleFormService),
      articles = inject(Articles)
    ) => ({
      createArticle: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending('article'))),
          switchMap(() => {
            const payload: CreateArticlePayloadModel =
              addEditArticleFormService.articleForm.getRawValue();

            return articles.createArticle(payload).pipe(
              tapResponse({
                next: (article) => patchState(store, setFulfilled('article')),
                error: (error: HttpErrorResponse) => patchState(store, setError('article', error)),
              })
            );
          })
        )
      ),
      
    })
  )
);
