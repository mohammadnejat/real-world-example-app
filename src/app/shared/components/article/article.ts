import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { ArticleModel } from '../../../core/models/article.model';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Articles } from '../../../core/services/articles';

@Component({
  selector: 'app-article',
  imports: [RouterLink, DatePipe],
  templateUrl: './article.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Article {
  readonly article = input.required<ArticleModel>();
  readonly favoriteArticle = output<string>();
  readonly unFavoriteArticle = output<string>();

  favorite() {
    if (this.article().favorited) {
      this.unFavoriteArticle.emit(this.article().slug);
    } else {
      this.favoriteArticle.emit(this.article().slug);
    }
  }
}
