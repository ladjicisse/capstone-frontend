import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EnvService} from './services/env.service';
import {MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('capstone-frontend');
  public userInfo:any = {};
  private envService = inject(EnvService);
  private msalService = inject(MsalService);

  async ngOnInit() {
    await this.msalService.instance.initialize(); // ✅ safety call
    this.envService.logConfig();
    const result = await this.msalService.instance.handleRedirectPromise();
    if (result && result.account) {
      this.userInfo = result.account;
      this.msalService.instance.setActiveAccount(result.account);
    }
  }

  login(): void {
    this.msalService.loginRedirect();
  }

  logout(): void {
    this.msalService.logoutRedirect({ postLogoutRedirectUri: '/'});
  }

  isAuthenticated(): boolean {
    return this.msalService.instance.getActiveAccount() !== null;
  }
}
