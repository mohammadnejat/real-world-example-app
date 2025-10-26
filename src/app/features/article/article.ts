import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ArticleStore } from './store/article.store';
import { Articles } from '../../core/services/articles';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationStore } from '../../authentication/authentication.store';
import { ArticleForm } from './article.form';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-article',
  imports: [DatePipe, RouterLink,ReactiveFormsModule],
  providers: [ArticleStore, Articles,ArticleForm],
  templateUrl: './article.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Article {
  #article = inject(ArticleStore);
  #authenticationStore = inject(AuthenticationStore);
  #form = inject(ArticleForm);

  readonly vm = this.#article.vm;
  readonly commentForm = this.#form.form;

  readonly isAuthenticated = computed(() => this.#authenticationStore.user());

  readonly userImage = computed(() => this.#authenticationStore.user()?.image);


  addComment() {
    this.#article.addComment();
  }

  deleteComment(id:number) {
    this.#article.deleteComment(id);
  }
}
