import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ArticleStore } from './store/article.store';
import { Articles } from '../../core/services/articles';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationStore } from '../../authentication/authentication.store';
import { ArticleForm } from './article.form';
import { ReactiveFormsModule } from '@angular/forms';
import { Profiles } from '../../core/services/profiles';

@Component({
  selector: 'app-article',
  imports: [DatePipe, RouterLink,ReactiveFormsModule],
  providers: [ArticleStore, Articles,ArticleForm,Profiles],
  templateUrl: './article.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Article {
  #articleStore = inject(ArticleStore);
  #authenticationStore = inject(AuthenticationStore);
  #form = inject(ArticleForm);

  readonly vm = this.#articleStore.vm;
  readonly commentForm = this.#form.form;

  readonly userInfo = computed(() => this.#authenticationStore.user());

  readonly userImage = computed(() => this.#authenticationStore.user()?.image);


  addComment() {
    this.#articleStore.addComment();
  }

  deleteComment(id:number) {
    this.#articleStore.deleteComment(id);
  }

  toggleFavorite() {
    if(this.vm().article()?.favorited) {
      this.#articleStore.unfavoriteArticle();
    } else {
      this.#articleStore.favoriteArticle();
    }
  }

  followUser(username: string) {
    this.#articleStore.followUser(username);
  }
}
