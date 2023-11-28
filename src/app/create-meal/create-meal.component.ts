import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CurrentUser } from 'interfaces/current-user.interface';
import { ItemInfo } from 'interfaces/item-info.interface';
import { Item } from 'interfaces/item.interface';
import { NutritionalInfo } from 'interfaces/nutritional-info.interface';
import { DataService } from 'services/data.service';
import { ImageService } from 'services/image.service';
import { SearchService } from 'services/search.service';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.scss']
})
export class CreateMealComponent implements OnInit {

  constructor(public searchService: SearchService, public dataService: DataService, public imageService: ImageService) { }

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

  itemPopulated: boolean = false;

  tescoItems: Array<Item> = [];
  dunnesItems: Array<Item> = [];
  aldiItems: Array<Item> = [];

  initialSearch: Boolean = false;

  itemInfos: Array<ItemInfo> = [];

  addItemLoading: Boolean = false;
  createMealLoading: Boolean = false;

  populatedItemInfo: ItemInfo = {
    name: '',
    amount: 0,
    unit: '',
    calories: 0,
    protein: 0,
    fat: 0,
    saturates: 0,
    sugars: 0,
    salt: 0
  }

  totalMealCalories: NutritionalInfo = {
    calories: 0,
    protein: 0,
    fat: 0,
    saturates: 0,
    sugars: 0,
    salt: 0
  }

  @ViewChild('createMealForm', { static: false }) createMealForm!: NgForm;

  ngOnInit(): void {

    this.dataService.getCurrentUser()
      .then((user) => {
        this.currentUser = user;
      });

  }

  // Create Meal

  createMeal(mealTitle: string, mealImage: File) {

    this.createMealLoading = true;

    console.log(this.itemInfos)

    this.imageService.uploadImage(mealImage)
      .then((imageURL) => {
        this.dataService.createMeal(mealTitle, String(imageURL), this.itemInfos, this.currentUser)
          .then(() => {
            this.createMealForm.resetForm();
            this.emptyItems();
            this.createMealLoading = false;
          });
      });

  }

  // Populate Tesco Item

  populateTescoItem(productRef: string) {

    this.addItemLoading = true;

    this.searchService.getTescoItemInfo(productRef)
      .then((itemInfo) => {
        this.itemPopulated = true;
        this.populatedItemInfo = itemInfo;
        (document.getElementById("itemTitle") as HTMLInputElement).value = itemInfo.name;
        (document.getElementById("itemAmount") as HTMLInputElement).value = String(itemInfo.amount);
        (document.getElementById("itemUnit") as HTMLInputElement).value = itemInfo.unit;
        (document.getElementById("itemCal") as HTMLInputElement).value = String(itemInfo.calories);
        (document.getElementById("itemPro") as HTMLInputElement).value = String(itemInfo.protein);
        (document.getElementById("itemFat") as HTMLInputElement).value = String(itemInfo.fat);
        (document.getElementById("itemSat") as HTMLInputElement).value = String(itemInfo.saturates);
        (document.getElementById("itemSug") as HTMLInputElement).value = String(itemInfo.sugars);
        (document.getElementById("itemSal") as HTMLInputElement).value = String(itemInfo.salt);
        this.addItemLoading = false;
      })
      .catch((error) => {
        alert(error.message);
        this.addItemLoading = false;
      })

  }

  // Populate Dunnes Item

  populateDunnesItem(productRef: string) {

    this.addItemLoading = true;

    this.searchService.getDunnesItemInfo(productRef)
      .then((itemInfo) => {
        this.itemPopulated = true;
        this.populatedItemInfo = itemInfo;
        (document.getElementById("itemTitle") as HTMLInputElement).value = itemInfo.name;
        (document.getElementById("itemAmount") as HTMLInputElement).value = String(itemInfo.amount);
        (document.getElementById("itemUnit") as HTMLInputElement).value = itemInfo.unit;
        (document.getElementById("itemCal") as HTMLInputElement).value = String(itemInfo.calories);
        (document.getElementById("itemPro") as HTMLInputElement).value = String(itemInfo.protein);
        (document.getElementById("itemFat") as HTMLInputElement).value = String(itemInfo.fat);
        (document.getElementById("itemSat") as HTMLInputElement).value = String(itemInfo.saturates);
        (document.getElementById("itemSug") as HTMLInputElement).value = String(itemInfo.sugars);
        (document.getElementById("itemSal") as HTMLInputElement).value = String(itemInfo.salt);
        this.addItemLoading = false;
      })
      .catch((error) => {
        alert(error.message);
        this.addItemLoading = false;
      })
  }

  // Populate Aldi Item

  populateAldiItem(productRef: string) {

    this.addItemLoading = true;

    this.searchService.getAldiItemInfo(productRef)
      .then((itemInfo) => {
        this.itemPopulated = true;
        this.populatedItemInfo = itemInfo;
        (document.getElementById("itemTitle") as HTMLInputElement).value = itemInfo.name;
        (document.getElementById("itemAmount") as HTMLInputElement).value = String(itemInfo.amount);
        (document.getElementById("itemUnit") as HTMLInputElement).value = itemInfo.unit;
        (document.getElementById("itemCal") as HTMLInputElement).value = String(itemInfo.calories);
        (document.getElementById("itemPro") as HTMLInputElement).value = String(itemInfo.protein);
        (document.getElementById("itemFat") as HTMLInputElement).value = String(itemInfo.fat);
        (document.getElementById("itemSat") as HTMLInputElement).value = String(itemInfo.saturates);
        (document.getElementById("itemSug") as HTMLInputElement).value = String(itemInfo.sugars);
        (document.getElementById("itemSal") as HTMLInputElement).value = String(itemInfo.salt);
        this.addItemLoading = false;
      })
      .catch((error) => {
        alert(error.message);
        this.addItemLoading = false;
      })
  }

  // Add Item

  addItem(itemTitle: string, itemAmount: string, itemUnit: string, itemCal: string, itemPro: string, itemFat: string, itemSat: string, itemSug: string, itemSal: string) {

    this.itemInfos.push({
      name: itemTitle,
      amount: Math.round(parseFloat(itemAmount) * 10) / 10,
      unit: itemUnit,
      calories: Math.round(parseFloat(itemCal) * 10) / 10,
      protein: Math.round(parseFloat(itemPro) * 10) / 10,
      fat: Math.round(parseFloat(itemFat) * 10) / 10,
      saturates: Math.round(parseFloat(itemSat) * 10) / 10,
      sugars: Math.round(parseFloat(itemSug) * 10) / 10,
      salt: Math.round(parseFloat(itemSal) * 10) / 10
    });

    this.totalMealCalories.calories += Math.round(parseFloat(itemCal) * 10) / 10;
    this.totalMealCalories.protein += Math.round(parseFloat(itemPro) * 10) / 10;
    this.totalMealCalories.fat += Math.round(parseFloat(itemFat) * 10) / 10;
    this.totalMealCalories.saturates += Math.round(parseFloat(itemSat) * 10) / 10;
    this.totalMealCalories.sugars += Math.round(parseFloat(itemSug) * 10) / 10;
    this.totalMealCalories.salt += Math.round(parseFloat(itemSal) * 10) / 10;

  }

  // Update Populated Item

  updatePopulatedItem() {

    if (this.itemPopulated) {

      let amount = parseFloat((document.getElementById("itemAmount") as HTMLInputElement).value);
      (document.getElementById("itemCal") as HTMLInputElement).value = String(Math.round(((this.populatedItemInfo.calories / this.populatedItemInfo.amount) * amount) * 10) / 10);
      (document.getElementById("itemPro") as HTMLInputElement).value = String(Math.round(((this.populatedItemInfo.protein / this.populatedItemInfo.amount) * amount) * 10) / 10);
      (document.getElementById("itemFat") as HTMLInputElement).value = String(Math.round(((this.populatedItemInfo.fat / this.populatedItemInfo.amount) * amount) * 10) / 10);
      (document.getElementById("itemSat") as HTMLInputElement).value = String(Math.round(((this.populatedItemInfo.saturates / this.populatedItemInfo.amount) * amount) * 10) / 10);
      (document.getElementById("itemSug") as HTMLInputElement).value = String(Math.round(((this.populatedItemInfo.sugars / this.populatedItemInfo.amount) * amount) * 10) / 10);
      (document.getElementById("itemSal") as HTMLInputElement).value = String(Math.round(((this.populatedItemInfo.salt / this.populatedItemInfo.amount) * amount) * 10) / 10);

    }

  }

  // Unpopulate Item Form

  unPopulateItemForm() {

    this.itemPopulated = false;

  }

  // Empty Items

  emptyItems() {

    this.itemInfos = [];
    this.totalMealCalories.calories = 0;
    this.totalMealCalories.protein = 0;
    this.totalMealCalories.fat = 0;
    this.totalMealCalories.saturates = 0;
    this.totalMealCalories.sugars = 0;
    this.totalMealCalories.salt = 0;

  }

  // Search For Items

  searchForItems(searchQuery: string) {

    this.initialSearch = true;
    this.tescoItems = [];
    this.dunnesItems = [];
    this.aldiItems = [];

    this.searchService.getTescoItems(searchQuery)
      .then((items) => {
        this.tescoItems = items;
      });


    this.searchService.getDunnesItems(searchQuery)
      .then((items) => {
        this.dunnesItems = items;
      });

    this.searchService.getAldiItems(searchQuery)
      .then((items) => {
        this.aldiItems = items;
      });

  }

}
