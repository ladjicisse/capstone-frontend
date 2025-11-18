import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

  graphEndpoint = 'https://graph.microsoft.com/v1.0';

  constructor(
    private http: HttpClient,
    private msalService: MsalService
  ) {}

  getProfile() {
    return this.http.get<any>(this.graphEndpoint + '/me').pipe(
      map(user => ({
        id: user.id,
        displayName: user.displayName,
        givenName: user.givenName,
        surname: user.surname,
        email: user.mail ?? user.userPrincipalName
      }))
    );
  }

  async createUser(user: {
    displayName: string;
    mailNickname: string;
    userPrincipalName: string;
    password: string;
  }) {

    // 1. Acquire access token
    const token = await this.msalService
      .acquireTokenSilent({
        scopes: ['https://graph.microsoft.com/.default']
      })
      .toPromise()
      .catch(() => null);

    if (!token) {
      throw new Error("Cannot acquire Graph access token.");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.accessToken}`,
      'Content-Type': 'application/json'
    });

    // 2. Build Graph user object
    const body = {
      accountEnabled: true,
      displayName: user.displayName,
      mailNickname: user.mailNickname,
      userPrincipalName: user.userPrincipalName,  // ex: newuser@tenant.onmicrosoft.com
      passwordProfile: {
        forceChangePasswordNextSignIn: false,
        password: user.password
      }
    };

    // 3. Call Graph API
    return this.http.post(this.graphEndpoint + '/users', body, { headers }).toPromise();
  }
}
