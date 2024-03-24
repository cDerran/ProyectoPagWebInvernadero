import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
  console.error = function() {};
  console.warn = function() {};
  console.info = function() {};
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
