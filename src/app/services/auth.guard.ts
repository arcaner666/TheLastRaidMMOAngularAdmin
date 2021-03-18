import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate() {
    if (this.auth.AuthControl()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}