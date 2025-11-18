import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Profiles } from '../../../core/services/profiles';

@Component({
  selector: 'app-follow-button',
  imports: [],
  templateUrl: './follow-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowButton {
  readonly #profiles = inject(Profiles);

  readonly isFollowing = input.required<boolean>();
  readonly username = input.required<string>();
  followUser() {
    this.#profiles.followUser(this.username()).subscribe();
  }
}
