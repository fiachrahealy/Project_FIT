import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrentUser } from 'interfaces/current-user.interface';
import { Meal } from 'interfaces/meal.interface';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-record-meal',
  templateUrl: './record-meal.component.html',
  styleUrls: ['./record-meal.component.scss']
})
export class RecordMealComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RecordMealComponent>, public dataService: DataService, private ngZone: NgZone) { }

  meals: Array<Meal> = [];

  currentUser: CurrentUser = {
    ID: '',
    email: '',
    firstName: 'test',
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

  ngOnInit(): void {

    this.dataService.getCurrentUser()
      .then((user) => {
        this.currentUser = user;
        this.dataService.getAllMeals(user).then((meals) => {
          this.meals = meals;
        });
      });
  }

  // Create Food Diary Entry

  createFoodDiaryEntry(meal: string, date: string) {

    this.dataService.createFoodDiaryEntry(meal, new Date(date), this.currentUser)
      .then(() => {
        this.ngZone.run(() => {
          this.dataService.refreshFoodDiary();
          this.dialogRef.close();
        });
      })

  }

}
