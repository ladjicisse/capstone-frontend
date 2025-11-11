import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {EnvService} from './app/services/env.service';
import {MSAL_INSTANCE} from '@azure/msal-angular';
import {provideMsal} from './app/auth.config';


async function bootstrap() {

  const pca = await provideMsal(new EnvService());

  // Inject this instance into the app config
  (appConfig as any).providers.push({
    provide: MSAL_INSTANCE,
    useValue: pca,
    useFactory: pca,
  });

  await bootstrapApplication(App, appConfig);
}

bootstrap().catch(err => console.error(err));

// bootstrapApplication(App, appConfig)
//    .catch((err) => console.error(err));
