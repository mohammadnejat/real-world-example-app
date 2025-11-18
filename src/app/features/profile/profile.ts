import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ProfileStore } from './store/profile.store';

import { Articles } from '../../core/services/articles';
import { Profiles } from '../../core/services/profiles';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FollowButton } from '../../shared/components/follow-button/follow-button';
import { Article } from '../../shared/components/article/article';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-profile',
  imports: [FollowButton, Article, MatTabGroup, MatTab],
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileStore, Articles, Profiles],
})
export default class Profile {
  #profileStore = inject(ProfileStore);
  readonly vm = this.#profileStore.vm;

  readonly selectedTab = signal(0);

  getArticles = effect(() => this.#profileStore.getArticles(this.selectedTab()));
}
