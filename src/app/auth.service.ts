import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import * as auth0 from 'auth0-js'; 

(window as any).global = window;

@Injectable()
export class AuthService {
  constructor(public router: Router)  {
    this.access_token = null;
    this.id_token = null;
    this.expires_at = null;
    this.user = null;
  }

  access_token: any ;
  id_token: any;
  expires_at: any ;
  user: any ;

  auth0 = new auth0.WebAuth({
    clientID: environment.clientId,
    domain: environment.domain,
    responseType: 'token id_token',
    audience: environment.audience,
    redirectUri: environment.callback,
  });

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (err) console.log(err);
      if (!err && authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
      }
    });
  }

  private setSession(authResult: any): void {
    console.log(authResult)
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    this.access_token = authResult.accessToken;
    this.id_token = authResult.idToken;
    this.expires_at = expiresAt;
    this.user = authResult.idTokenPayload.sub;
  }
 
  public logout(): void {
    this.access_token = null;
    this.id_token = null;
    this.user = null;
    this.expires_at = null;

    this.auth0.logout({})
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(this.expires_at || '{}');
    return new Date().getTime() < expiresAt;
  }

  public createAuthHeaderValue(): string {
    return 'Bearer ' + this.access_token;
  }
}
