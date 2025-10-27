import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class RegisterForm {
  #fb = inject(FormBuilder);

  #form = this.#fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get registerForm(): FormGroup {
    return this.#form;
  }
}
