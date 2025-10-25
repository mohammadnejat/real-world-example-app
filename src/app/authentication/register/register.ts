import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterStore } from './store/register.store';
import { RegisterForm } from './register.form';
import { Authentication } from '../../core/services/authentication';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  providers: [RegisterStore, RegisterForm,Authentication],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Register {
  #registerStore = inject(RegisterStore);
  #registerForm = inject(RegisterForm);

  form: FormGroup = this.#registerForm.registerForm;

  signUp() {
    this.#registerStore.register();
  }
}
