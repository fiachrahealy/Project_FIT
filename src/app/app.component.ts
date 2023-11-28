import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateMealComponent } from './create-meal/create-meal.component';
import { RecordWeightComponent } from './record-weight/record-weight.component';
import { RecordMealComponent } from './record-meal/record-meal.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'project-fit';
  loggedIn: Boolean = false;
  mobile: Boolean = false;

  constructor(public router: Router, public authService: AuthService, public dialog: MatDialog, private ngZone: NgZone) { }

  ngOnInit(): void {

    if (window.screen.width <= 400) {
      this.mobile = true;
    }

  }

  // Change of Routes

  changeOfRoutes() {

    this.loggedIn = this.authService.isLoggedIn;

  }

  // Open Create Meal Dialog

  openCreateMealDialog() {

    this.ngZone.run(() => {
      this.dialog.open(CreateMealComponent, {

        height: '90vh',
        width: '100%',

      });
    });

  }

  // Open Record Meal Dialog

  openRecordMealDialog() {

    this.ngZone.run(() => {
      this.dialog.open(RecordMealComponent, {

        height: '30vh',
        width: '50%',

      });
    });

  }

  // Open Record Weight Dialog

  openRecordWeightDialog() {

    this.ngZone.run(() => {
      this.dialog.open(RecordWeightComponent, {

        height: '30vh',
        width: '50%',

      });
    });

  }

  // Open Settings Dialog

  openSettingsDialog() {

    this.ngZone.run(() => {
      this.dialog.open(SettingsComponent, {

        height: '50vh',
        width: '50%',

      });
    });

  }

}
