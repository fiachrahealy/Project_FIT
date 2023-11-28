import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuardService implements CanActivate {

  constructor(private authService: AuthService, private route: Router) { }

  // Can Access Logged Out Areas

  canActivate() {
    if (!this.authService.isLoggedIn) {
      return true;
    }
    this.route.navigate(['dashboard']);
    return false;
  }
}