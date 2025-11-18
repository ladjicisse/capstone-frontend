import {BrowserCacheLocation, InteractionType, PublicClientApplication} from '@azure/msal-browser';
import { MsalInterceptorConfiguration, MsalGuardConfiguration } from '@azure/msal-angular';
import { EnvService } from './services/env.service';

export const provideMsal =  async (envService: EnvService) => {
  const pca = new PublicClientApplication({
    auth: {
      clientId: envService.getAzureClientId(),
      authority: `https://login.microsoftonline.com/${envService.getAzureTenantId()}`,
      redirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage
    },
  });
  await pca.initialize().then(() => {
    console.log('MSAL instance initialized');
  });

  return pca;
}

export const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect, // Popup or Redirect
  authRequest: { scopes: ['User.Read'] },
  loginFailedRoute: '/',
};

export const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect, // Poup or Redirect
  protectedResourceMap: new Map([
    ['https://graph.microsoft.com/v1.0/me', ['User.Read']],
  ]),
};
