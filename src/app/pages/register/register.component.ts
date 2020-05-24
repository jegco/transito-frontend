import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/errors/services/error.service';
import { LoginService } from 'src/app/providers/user/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent {

  username: string;
  password: string;
  email: string;
  phoneNumber: number;
  confirmPassword: string;
  showSpinner = false;

  constructor(public readonly router: Router
    , public readonly errorService: ErrorService
    , private readonly loginService: LoginService
    , public readonly toast: ToastrService) {
    super(router, errorService, toast);
  }

  register() {
    if (this.username && this.password && this.email && this.phoneNumber) {
      if (this.confirmPassword === this.password) {
        this.showSpinner = true;
        this.loginService.register(this.username, this.email, this.password, this.phoneNumber)
          .subscribe(() => {
            this.showSpinner = false;
            this.toast.success('usuario creado exitosamente');
          }, error => {
            this.handleException(error);
            this.showSpinner = false;
          })
      } else {
        this.errorMessage = 'Las contraseñas deben ser iguales';
      }
    }
  }

}
