import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ArticleStore } from './store/article.store';
import { Articles } from '../../core/services/articles';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-article',
  imports: [DatePipe, RouterLink],
  providers: [ArticleStore,Articles],
  templateUrl: './article.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Article { 
  #article = inject(ArticleStore);
  vm = this.#article.vm;
}
