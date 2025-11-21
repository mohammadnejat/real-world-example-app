import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthenticationStore } from '../../authentication/authentication.store';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Setting {
  readonly #authenticationStore = inject(AuthenticationStore);
  logout() {
    this.#authenticationStore.logout();
  }
}
