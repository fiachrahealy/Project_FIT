import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'interfaces/current-user.interface';
import { FoodDiaryEntry } from 'interfaces/food-diary-entry.interface';
import { ItemInfo } from 'interfaces/item-info.interface';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-food-diary',
  templateUrl: './food-diary.component.html',
  styleUrls: ['./food-diary.component.scss']
})
export class FoodDiaryComponent implements OnInit {

  constructor(public dataService: DataService) {

    this.dataService.foodDiaryRefreshEvent.subscribe(value => {

      if (value === true) {
        this.pullFoodDiaryData();

      }

    });

  }

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

  currentUserFoodDiaryEntry: FoodDiaryEntry = {
    ID: '',
    meals: [],
    date: new Date(),
    createdBy: this.currentUser
  };

  foodDiaryLoading: Boolean = false;

  ngOnInit(): void {

    this.pullFoodDiaryData();

  }

  // Pull Food Diary Data

  pullFoodDiaryData() {

    this.foodDiaryLoading = true;

    this.dataService.getCurrentUser()
      .then((user) => {
        this.currentUser = user;
        return this.dataService.getFoodDiaryEntry(this.currentUser, new Date());
      })
      .then((foodDiaryEntry) => {
        this.currentUserFoodDiaryEntry = foodDiaryEntry;
        this.foodDiaryLoading = false;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }

  // Sum Calories

  sumCalories(itemInfos: Array<ItemInfo>) {

    let calories = 0;
    itemInfos.forEach((itemInfo) => {
      calories += itemInfo.calories;
    });
    return calories;

  }

  // Get Total Food Diary Calories

  getTotalFoodDiaryCalories(): number {

    let calories = 0;
    this.currentUserFoodDiaryEntry.meals.forEach(meal => {
      calories += this.sumCalories(meal.itemInfos);
    });
    return calories;

  }

  // Sum Protein

  sumProtein(itemInfos: Array<ItemInfo>) {

    let protein = 0;
    itemInfos.forEach((itemInfo) => {
      protein += itemInfo.protein;
    });
    return protein;

  }

  // Get Total Food Diary Protein

  getTotalFoodDiaryProtein(): number {

    let protein = 0;
    this.currentUserFoodDiaryEntry.meals.forEach(meal => {
      protein += this.sumProtein(meal.itemInfos);
    });
    return protein;

  }

  // Sum Fat

  sumFat(itemInfos: Array<ItemInfo>) {

    let fat = 0;
    itemInfos.forEach((itemInfo) => {
      fat += itemInfo.fat;
    });
    return fat;

  }

  // Get Total Food Diary Fat

  getTotalFoodDiaryFat(): number {

    let fat = 0;
    this.currentUserFoodDiaryEntry.meals.forEach(meal => {
      fat += this.sumFat(meal.itemInfos);
    });
    return fat;

  }

  // Sum Saturates

  sumSaturates(itemInfos: Array<ItemInfo>) {

    let saturates = 0;
    itemInfos.forEach((itemInfo) => {
      saturates += itemInfo.saturates;
    });
    return saturates;

  }

  // Get Total Food Diary Saturates

  getTotalFoodDiarySaturates(): number {

    let saturates = 0;
    this.currentUserFoodDiaryEntry.meals.forEach(meal => {
      saturates += this.sumSaturates(meal.itemInfos);
    });
    return saturates;

  }

  // Sum Sugars

  sumSugars(itemInfos: Array<ItemInfo>) {

    let sugars = 0;
    itemInfos.forEach((itemInfo) => {
      sugars += itemInfo.sugars;
    });
    return sugars;

  }

  // Get Total Food Diary Sugars

  getTotalFoodDiarySugars(): number {

    let sugars = 0;
    this.currentUserFoodDiaryEntry.meals.forEach(meal => {
      sugars += this.sumSugars(meal.itemInfos);
    });
    return sugars;

  }

  // Sum Salt

  sumSalt(itemInfos: Array<ItemInfo>) {

    let salt = 0;
    itemInfos.forEach((itemInfo) => {
      salt += itemInfo.salt;
    });
    return salt;

  }

  // Get Total Food Diary Salt

  getTotalFoodDiarySalt(): number {

    let salt = 0;
    this.currentUserFoodDiaryEntry.meals.forEach(meal => {
      salt += this.sumSalt(meal.itemInfos);
    });
    return salt;

  }

}
