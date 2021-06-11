import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!this.isLoggedIn()) {
      console.log('not logged in')
      this.router.navigate(['signin']);
      return false;
    }
    console.log('logged in')
    return true;
  }
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
