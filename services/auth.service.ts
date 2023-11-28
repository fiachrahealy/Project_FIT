import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {
  userData: any;
  constructor(public firestore: AngularFirestore, public fireauth: AngularFireAuth, public route: Router, public ngZone: NgZone) {

    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign In

  signIn(email: string, password: string) {

    return new Promise<any>((resolve, reject) => {

      this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
        this.fireauth.authState.subscribe((user) => {
          if (user) {
            this.route.navigate(['dashboard']);
            resolve({ success: true });
          }
        });
      })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Sign Out

  signOut() {
    this.fireauth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.route.navigate(['']);
      });
  }

  // Is Logged In

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

}