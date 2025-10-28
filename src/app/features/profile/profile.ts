import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileStore } from './store/profile.store';

import { Articles } from '../../core/services/articles';
import { Profiles } from '../../core/services/profiles';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileStore,Articles,Profiles],
})
export default class Profile {
  #profileStore = inject(ProfileStore);
  vm = this.#profileStore.vm;
}
