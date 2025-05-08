import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)] /* only keep routing here - 
  providers:[provideRouter(routes, withComponentInputBinding(), provideHttpClient())]*/

};
