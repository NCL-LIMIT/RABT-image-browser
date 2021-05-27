import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  passwordText: string;
  message: string;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dataService.setPasswordEntered(false);
  }

  async enterPassword() {
    if (this.passwordText) {
      // check if password is correct
      const response = await this.dataService.checkPassword(this.passwordText);
      if (response === 'Unauthorized') {
        this.passwordText = '';
        this.message = 'Incorrect password, please try again';
      } else {
        this.dataService.setPasswordEntered(true);
        this.setSession();
        this.router.navigate(['images']);
        }
      } else {
      this.passwordText = '';
      this.message = 'Incorrect password, please try again';
    }
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
