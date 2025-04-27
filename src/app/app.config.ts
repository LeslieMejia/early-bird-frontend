import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes'; // <-- now correctly importing 'routes'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)] // <-- using 'routes' here too
};
