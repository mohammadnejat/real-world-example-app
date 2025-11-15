import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AddEditArticleFormService } from './add-edit-article-form.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-article',
  imports: [ReactiveFormsModule],
  providers: [AddEditArticleFormService],
  templateUrl: './add-edit-article.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddEditArticle {
  #addEditArticleFormService = inject(AddEditArticleFormService);
  articleForm = this.#addEditArticleFormService.articleForm;

  addTag(tag: string) {
    this.articleForm.patchValue({
      tagList: [...this.articleForm.get('tagList')?.value, tag],
    });
  }


  createArticle() {}
}
