import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/providers/user/login.service';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/errors/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit{

  username: string;
  password: string;
  showSpinner = false;

  constructor(public readonly router: Router
    , public readonly errorService: ErrorService
    , private readonly loginService: LoginService
    , public readonly toast: ToastrService) {
    super(router, errorService, toast);
  }

  ngOnInit(): void {
    if( localStorage.getItem('token') !== null){
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.showSpinner = true;
    if(this.username && this.password) {
      this.loginService.login(this.username, this.password)
      .subscribe(() => {
        this.showSpinner = false;
        this.router.navigate(['/dashboard']);
      }, error => {
        this.showSpinner = false;
        this.handleException(error)
      });
    }
  }

}
