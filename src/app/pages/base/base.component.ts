import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/errors/services/error.service';

declare var H: any;

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.sass']
})
export class BaseComponent {

  errorMessage: string;
  platform: any;

  constructor(public router: Router,
    public errorService: ErrorService,
    public toast: ToastrService) {
    this.platform = new H.service.Platform({
      "apikey": "BNBi1cMp5htkcfPgw6a6HBPF06ymGygntZdlmEdPTZw"
    });
  }

  openPage(routename: string) {
    this.router.navigateByUrl(`${routename}`);
  }

  handleException(error: Error) {
    const handledError = this.errorService.handleException(error);
    if (handledError.toastNotifiation) {
      this.toast.error(handledError.message);
    } else {
      debugger;
      this.errorMessage = handledError.message;
    }
  }

  mostrarOpcionesSuperAdmin(): boolean {
    return localStorage.getItem('rol') === 'SUPER_ADMIN';
  }

}
