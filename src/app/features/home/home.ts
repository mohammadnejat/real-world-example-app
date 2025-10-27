import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeStore } from './store/home.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Articles } from '../../core/services/articles';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArticleSingleSlugModel } from '../../core/models/article.model';
import { MatTabGroup, MatTab, MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-home',
  imports: [MatProgressSpinnerModule, DatePipe, RouterLink,MatTabsModule],
  providers: [HomeStore, Articles],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  #article = inject(HomeStore);
  vm = this.#article.vm;

  favoriteArticle(article: ArticleSingleSlugModel) {
    if (article.favorited) {
      this.#article.unfavoriteArticle(article.slug);
    } else {
      this.#article.favoriteArticle(article.slug);
    }
  }
}
