import { Component, OnInit } from '@angular/core';
import {MainControllerService} from '../../controllerServices/main-controller.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';
import {Restaurant} from '../../models/Restaurant';
import {Client} from '../../models/Client';

@Component({
  selector: 'app-logination',
  templateUrl: './logination.component.html',
  styleUrls: ['./logination.component.css']
})
export class LoginationComponent implements OnInit {

  user: User = new User();
  restaurant: Restaurant = new Restaurant();
  client: Client = new Client();
  responseLogination = '';
  emailToRestorePass = '';
  showLoginForm = false;
  showEmailForm = false;
  showForgotPasswordForm = false;
  responseChangePass = '';

  constructor(
    private mainControllerService: MainControllerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => {
      localStorage.clear();
      this.user = new User();
    });
    this.showLoginForm = false;
    this.showEmailForm = false;
    this.showForgotPasswordForm = false;
  }

  useLogin() {
    this.showLoginForm = true;
    this.showEmailForm = false;
    this.showForgotPasswordForm = false;
  }

  useEmail() {
    this.showEmailForm = true;
    this.showLoginForm = false;
    this.showForgotPasswordForm = false;
  }

  forgotPassword() {
    this.showForgotPasswordForm = true;
    this.showLoginForm = false;
    this.showEmailForm = false;
  }

  loginL(formLoginL: HTMLFormElement) {
    localStorage.clear();

    this.mainControllerService.login(this.user).
    subscribe(
      value => {
        const token = value.headers.get('Authorization');
        const userLogged = value.headers.get('UserLogged');
        const userClass = value.headers.get('UserClass');

        localStorage.setItem('_token', token);
        localStorage.setItem('_userLogged', userLogged);
        console.log('token: ' + token);

        if (this.user.username === 'admin') {
          this.router.navigate(['admin']);
        } else {

          this.user = JSON.parse(userLogged);
          if (userClass === 'class oktenweb.restaurant_back3.models.Restaurant') {

            this.restaurant = JSON.parse(userLogged);
            this.router.navigate(['restaurant'], {queryParams: this.restaurant});
          } else if (userClass === 'class oktenweb.restaurant_back3.models.Client') {

            this.client = JSON.parse(userLogged);
            this.router.navigate(['client'], {queryParams: this.client});
          }
        }

        this.responseLogination = 'Access successful!'; },
      err => {console.log('err: ' + err.toString());
              this.showLoginForm = true;
              this.responseLogination = 'Access denied!'; }
    );
  }


  loginE(formLoginE: HTMLFormElement) {
    const email = this.user.email;
    console.log('email: ' + email);
    localStorage.clear();

    this.mainControllerService.getLogins().
    subscribe(loginsList => {
      for (const u of loginsList) {
        if (u.email === this.user.email) {
          this.user.username = u.username;
        }
      }
      this.mainControllerService.login(this.user).
      subscribe(
        value => {
          const token = value.headers.get('Authorization');
          const userLogged = value.headers.get('UserLogged');
          const userClass = value.headers.get('UserClass');

          localStorage.setItem('_token', token);
          console.log('token: ' + token);

          this.user = JSON.parse(userLogged);
          if (userClass === 'class oktenweb.restaurant_back3.models.Restaurant') {

            this.restaurant = JSON.parse(userLogged);
            this.router.navigate(['restaurant'], {queryParams: this.restaurant});
          } else if (userClass === 'class oktenweb.restaurant_back3.models.Client') {

            this.client = JSON.parse(userLogged);
            this.router.navigate(['client'], {queryParams: this.client});
          }
          this.responseLogination = 'Access successful!'; },
        err => {console.log('err: ' + err.toString());
                this.showLoginForm = true;
                this.responseLogination = 'Access denied!'; }
      );
    });
  }

  sendRequestNewPass(emailToRestorePass: string) {
    this.showForgotPasswordForm = false;
    console.log(this.emailToRestorePass);
    this.mainControllerService.getLogins().
    subscribe(loginsList => {
      for (const u of loginsList) {
        if (u.email === this.emailToRestorePass) {
          this.user.id = u.id;
          this.mainControllerService.forgotPassword(this.user).
          subscribe(res => {
            console.log(res.text);
            alert(res.text) ; });
        } else { this.responseChangePass = 'Looking for your account...'; }
      }
    });
  }
}
