import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { HomeStore } from './store/home.store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Articles } from '../../core/services/articles';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-home',
  imports: [MatProgressSpinnerModule, DatePipe, RouterLink],
  providers: [HomeStore,Articles],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  #article = inject(HomeStore);
  vm = this.#article.vm;

  favoriteArticle(slug: string) {
    this.#article.favoriteArticle(slug);

  }
}
