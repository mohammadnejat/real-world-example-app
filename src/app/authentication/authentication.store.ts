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
    vm: computed(() => ({ isUserLogin: computed(() => !!store.user()), store })),
  })),
  withMethods((store) => ({
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
  })),
  withHooks({
    onInit: (store) => {
      store.retriveUser();
    },
  })
);
