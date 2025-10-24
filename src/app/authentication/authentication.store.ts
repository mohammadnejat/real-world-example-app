import { inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { LoginForm } from './login/login.form';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { setFulfilled, setPending, withRequestState } from '../core/states/request-state.feature';
import { Authentication } from '../core/services/authentication';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

export const AuthenticationStore = signalStore(
  withState([]),
  withRequestState({ prefix: 'login' }),
  withComputed((store) => ({})),
  withMethods((store, authentication = inject(Authentication), loginForm = inject(LoginForm)) => ({
    login: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending('login'))),
        switchMap(() =>
          authentication
            .login(loginForm.loginForm.value)
            .pipe(
              tapResponse({
                next: (user) => {
                    // patchState(store, user.user, setFulfilled('login'))
                },
                error: (error: HttpErrorResponse) => patchState(store, setFulfilled('login')),
              })
            )
        )
      )
    ),
    
  }))
);
