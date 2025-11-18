import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, Observable} from 'rxjs';
import {AccountInfo, InteractionStatus} from '@azure/msal-browser';
import {MsalBroadcastService, MsalService} from '@azure/msal-angular';
import {HttpClient} from '@angular/common/http';
import {EnvService} from './env.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentAccount = new BehaviorSubject<AccountInfo | null>(null);

  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private httpClient: HttpClient,
    private envService: EnvService
  ) {
    // Initialize the MSAL Broadcast Service
    this.msalService.initialize()
      .subscribe(async () => {
        const result = await this.msalService.instance.handleRedirectPromise();
        if (result && result.account) {
          this.msalService.instance.setActiveAccount(result.account);
          this.currentAccount.next(result.account);
        }
      });

    // Subscribe to MSAL Broadcast Service to listen for authentication events
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        const account = this.msalService.instance.getActiveAccount();
        if (account) {
          this.currentAccount.next(account);
        }
      });
  }

  login(): void {
    this.msalService.loginRedirect();
  }

  logout(): void {
    this.msalService.logoutRedirect({ postLogoutRedirectUri: this.envService.getWebAppUrl()});
  }

  getCurrentAccount$(): Observable<AccountInfo | null> {
    return this.currentAccount.asObservable() || this.msalService.instance.getActiveAccount();
  }

  getCurrentAccount(): AccountInfo | null {
    return this.msalService.instance.getActiveAccount();
  }
}
