import { Component } from '@angular/core';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public authService: AuthService) { }

  errorMessage: String = "";

  // Sign In

  signIn(email: string, password: string) {

    this.authService.signIn(email, password)
      .catch((error) => {
        this.errorMessage = error;
      });

  }
}
