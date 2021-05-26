import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  passwordText: string;
  correctPassword: string;
  message: string;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.correctPassword = 'T1N2A3';
    this.dataService.setPasswordEntered(false);
  }


  enterPassword() {
    if (this.passwordText === this.correctPassword) {
      this.dataService.setPasswordEntered(true);
      this.setSession();
      // navigate to home or to route saved in local storage
      const route = this.routeInLocal();
      const paramKey = localStorage.getItem('paramKey');
      const paramValue = localStorage.getItem('paramValue');
      console.log(route);
      if (route === undefined || route === null) {
        this.router.navigate(['images']);
      } else {
        localStorage.removeItem('route');
        if (paramKey === null || paramValue === null) {
          this.router.navigate([route]);
        }
        else {
          localStorage.removeItem('paramKey');
          localStorage.removeItem('paramValue');
          this.router.navigate([route], {queryParams: {paramKey: paramValue}} );
        }

      }
    } else {
      this.passwordText = '';
      this.message = 'Incorrect password, please try again';
    }
  }

  routeInLocal(): string {
    return localStorage.getItem('route');
  }

  setSession() {
    const expiresAt = moment().add(2, 'hour');

    localStorage.setItem('id_token', 'loggedIn');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
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
