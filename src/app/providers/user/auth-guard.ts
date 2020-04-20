import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor() { }

  canActivate(): boolean | Observable<boolean> {
    return localStorage.getItem('rol') === 'SUPER_ADMIN';
  }
}
