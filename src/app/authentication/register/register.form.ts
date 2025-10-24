import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class LoginForm {
  #fb = inject(FormBuilder);

  #form = this.#fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  get loginForm(): FormGroup {
    return this.#form;
  }
}
