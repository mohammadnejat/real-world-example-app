import { ChangeDetectionStrategy, Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { HomeStore } from './store/home.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Articles } from '../../core/services/articles';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArticleSingleSlugModel } from '../../core/models/article.model';
import { MatTabGroup, MatTab, MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { Article } from '../../shared/components/article/article';
@Component({
  selector: 'app-home',
  imports: [MatProgressSpinnerModule, DatePipe, RouterLink, MatTabsModule, Article],
  providers: [HomeStore, Articles],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  #homeStore = inject(HomeStore);
  vm = this.#homeStore.vm;

  selectedTabIndex = linkedSignal(() => 0);
  lol = signal(0);
  yy = effect(() => console.log(this.vm().selectedTabIndex()));
  y(event: any) {
    console.log(event);
  }

  u(event: MatTabChangeEvent) {
    console.log(event);
  }

  favoriteArticle(article: ArticleSingleSlugModel) {
    this.#homeStore.favoriteArticle(article.slug);
  }

  unFavoriteArticle(article: ArticleSingleSlugModel) {
    this.#homeStore.unfavoriteArticle(article.slug);
  }

  searchTag(tag: string) {
    this.#homeStore.searchTag(tag);
  }
}
