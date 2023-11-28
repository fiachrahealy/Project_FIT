import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrentUser } from 'interfaces/current-user.interface';
import { NutritionalInfo } from 'interfaces/nutritional-info.interface';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SettingsComponent>, public dataService: DataService, private ngZone: NgZone) { }

  currentUser: CurrentUser = {
    ID: '',
    email: '',
    firstName: '',
    lastName: '',
    height: 0,
    nutritionalGoals: {
      calories: 0,
      protein: 0,
      fat: 0,
      saturates: 0,
      sugars: 0,
      salt: 0
    }
  }

  currentUsersNutritionalGoals: NutritionalInfo = {
    calories: 0,
    protein: 0,
    fat: 0,
    saturates: 0,
    sugars: 0,
    salt: 0
  }

  ngOnInit(): void {

    this.dataService.getCurrentUser()
      .then((user) => {
        this.currentUser = user;
      });

  }

  // Update User

  updateUser(firstName: string, lastName: string, height: string, cal: string, pro: string, fat: string, sat: string, sug: string, sal: string) {

    this.dataService.updateUser(this.currentUser.ID, firstName, lastName, parseFloat(height), parseFloat(cal), parseFloat(pro), parseFloat(fat), parseFloat(sat), parseFloat(sug), parseFloat(sal))
      .then(() => {
        this.ngZone.run(() => {
          this.dataService.refreshWeightGraph();
          this.dataService.refreshFoodDiary();
          this.dialogRef.close();
        });
      })

  }

}
