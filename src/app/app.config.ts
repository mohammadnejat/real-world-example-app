import { ApplicationConfig } from '@angular/core';

import { providers } from './app.providers';

export const appConfig: ApplicationConfig = {
  providers: [providers()],
};
