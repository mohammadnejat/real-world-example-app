import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from './login.form';
import { LoginStore } from './store/login.store';
import { Authentication } from '../../core/services/authentication';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  providers: [LoginForm,LoginStore,Authentication],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Login {
  #loginStore = inject(LoginStore);

  #form = inject(LoginForm);
  loginForm = this.#form.loginForm;

  login() {
    this.#loginStore.login();
  }
}
