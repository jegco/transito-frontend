import { Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { environment as ENV } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private injector: Injector, private router: Router) { }

  handleException(error: Error) {
    let handledError;
    debugger;
    if (error instanceof HttpErrorResponse) {
      debugger;
      if(error.status === 401 || error.status === 0) {
        localStorage.removeItem('token');
        this.router.navigateByUrl('login');
        handledError = this.addContextInfo(error, false);
      } else {
      handledError = this.addContextInfo(error, false);
      }
    }
    else {
    handledError = this.addContextInfo(error, true);
    }
    if( !ENV.production ) {
      console.log(handledError);
    }
    return handledError;
  }

  addContextInfo(error: Error, toastNotifiation: Boolean) {
    // All the context details that you want (usually coming from other services; Constants, UserService...)
    const name = error.name || null;
    const appId = 'estacionFrontendAdmin';
    const user = localStorage.getItem("username") ? localStorage.getItem("username"): "no user";
    const time = new Date().getTime();
    const id = `${appId}-${user}-${time}`;
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    let message;
    if (error instanceof HttpErrorResponse) {
      if(error.status == 500) {
        message = 'sucedio un error en la conexion con el servidor, intente de nuevo';
      } else if (error.status == 401) {
        message = 'Usuario y contraseña incorrectos';
        this.router.navigate['/login'];
      } else {
      message = error.error;
      }
    }
    else { 
      message = error.message;
    }
    const stack = error instanceof HttpErrorResponse ? null : error.stack;
    const toast = toastNotifiation;
    const errorToSend = {name, appId, user, time, id, url, message, stack, toastNotifiation};
    return errorToSend;
  }
}
