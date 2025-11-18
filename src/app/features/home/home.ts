import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeStore } from './store/home.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Articles } from '../../core/services/articles';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArticleSingleSlugModel } from '../../core/models/article.model';
import { MatTabGroup, MatTab, MatTabsModule } from '@angular/material/tabs';
import { Article } from '../../shared/components/article/article';
@Component({
  selector: 'app-home',
  imports: [MatProgressSpinnerModule, DatePipe, RouterLink, MatTabsModule, Article],
  providers: [HomeStore, Articles],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  #article = inject(HomeStore);
  vm = this.#article.vm;

  favoriteArticle(article: ArticleSingleSlugModel) {
    this.#article.favoriteArticle(article.slug);
  }

  unFavoriteArticle(article: ArticleSingleSlugModel) {
    this.#article.unfavoriteArticle(article.slug);
  }
}
