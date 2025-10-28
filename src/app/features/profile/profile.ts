import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileStore } from './store/profile.store';

import { Articles } from '../../core/services/articles';
import { Profiles } from '../../core/services/profiles';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileStore,Articles,Profiles],
})
export default class Profile {
  #profileStore = inject(ProfileStore);
  vm = this.#profileStore.vm;
}
