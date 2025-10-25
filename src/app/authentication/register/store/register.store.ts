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
import { RegisterForm } from '../register.form';
import { RegisterPayloadModel } from '../../../core/models/authentication.model';
import { AuthenticationStore } from '../../authentication.store';
import { Router } from '@angular/router';

export const RegisterStore = signalStore(
  withState([]),
  withRequestState({ prefix: 'register' }),
  withComputed((store) => ({})),
  withMethods(
    (
      store,
      authentication = inject(Authentication),
      registerForm = inject(RegisterForm),
      authenticationStore = inject(AuthenticationStore),
      router = inject(Router)
    ) => ({
      register: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending('register'))),
          switchMap(() => {
            const payload: RegisterPayloadModel = {
              user: {
                ...registerForm.registerForm.value,
              },
            };
            return authentication.register(payload).pipe(
              tapResponse({
                next: (user) => {
                  authenticationStore.setAccsessUserData(user.user);
                  router.navigate(['']);
                },
                error: (error: HttpErrorResponse) => patchState(store, setFulfilled('register')),
              })
            );
          })
        )
      ),
    })
  )
);
