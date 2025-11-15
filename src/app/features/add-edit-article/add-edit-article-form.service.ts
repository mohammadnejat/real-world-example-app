import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class AddEditArticleFormService {
  #fb = inject(FormBuilder);

  #form = this.#fb.nonNullable.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    body: ['', [Validators.required]],
    tagList: [[] as string[]],
  });

  get articleForm(): FormGroup {
    return this.#form;
  }
}
