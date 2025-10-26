import { inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {
  setFulfilled,
  setPending,
  withRequestState,
} from '../../../core/states/request-state.feature';
import { Authentication } from '../../../core/services/authentication';
import { LoginForm } from '../login.form';
import { AuthenticationStore } from '../../authentication.store';
import { Router } from '@angular/router';
import { LoginPayloadModel } from '../../../core/models/authentication.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export const LoginStore = signalStore(
  withRequestState({ prefix: 'login' }),
  withMethods(
    (
      store,
      authentication = inject(Authentication),
      loginForm = inject(LoginForm),
      authenticationStore = inject(AuthenticationStore),
      router = inject(Router),
      snackbar = inject(MatSnackBar)
    ) => ({
      login: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending('login'))),
          switchMap(() => {
            const payload: LoginPayloadModel = {
              user: {
                ...loginForm.loginForm.value
              },
            };
            return authentication.login(payload).pipe(
              tapResponse({
                next: (user) => {
                  snackbar.open('Login Successful', 'Dismiss');
                  authenticationStore.setAccsessUserData(user.user);
                  router.navigate(['']);
                },
                error: (error: HttpErrorResponse) => {
                  
                  patchState(store, setFulfilled('login'))
                },
              })
            );
          })
        )
      ),
    })
  )
);
