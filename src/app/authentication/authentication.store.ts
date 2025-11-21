import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { LoginForm } from './login/login.form';

import { Authentication } from '../core/services/authentication';
import { UserModel } from '../core/models/authentication.model';
import { MatSnackBar } from '@angular/material/snack-bar';

const CURRENT_USER_TOKEN = 'user_token';

interface AuthenticationStateModel {
  user: UserModel | null;
}
const intialState: AuthenticationStateModel = {
  user: null,
};

export const AuthenticationStore = signalStore(
  { providedIn: 'root' },
  withState(intialState),
  withComputed((store) => ({
    vm: computed(() => ({ isUserLogin: computed(() => !!store.user()), ...store })),
  })),
  withMethods((store,messageService = inject(MatSnackBar)) => ({
    setAccsessUserData: (userInfo: UserModel) => {
      localStorage.setItem(CURRENT_USER_TOKEN, JSON.stringify(userInfo));
      patchState(store, { user: userInfo });
    },
    retriveUser: () => {
      const userInfo = localStorage.getItem(CURRENT_USER_TOKEN);
      if (userInfo) {
        patchState(store, { user: JSON.parse(userInfo) });
      }
    },
    logout: () => {
      localStorage.removeItem(CURRENT_USER_TOKEN);
      patchState(store, { user: null });
      messageService.open('You have been logged out.', 'success');
    },
  })),
  withHooks({
    onInit: (store) => {
      store.retriveUser();
    },
  })
);
