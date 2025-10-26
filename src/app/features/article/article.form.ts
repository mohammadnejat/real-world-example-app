import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ArticleForm {

  #form = new FormControl('')

  get form(): FormControl {
    return this.#form;
  }
}
