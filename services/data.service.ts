import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ItemInfo } from 'interfaces/item-info.interface';
import { Meal } from 'interfaces/meal.interface';
import { User } from 'interfaces/user.interface';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CurrentUser } from 'interfaces/current-user.interface';
import { WeightDiaryEntry } from 'interfaces/weight-diary-entry.interface';
import { Timestamp } from "firebase/firestore"
import { Subject } from 'rxjs';
import { FoodDiaryEntry } from 'interfaces/food-diary-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore) { }

  weightGraphRefreshEvent: Subject<any> = new Subject();
  foodDiaryRefreshEvent: Subject<any> = new Subject();

  // Update User

  updateUser(ID: string, firstName: string, lastName: string, height: number, calories: number, protein: number, fat: number, saturates: number, sugars: number, salt: number): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      this.firestore.collection('users').doc(ID).ref.update({
        firstName: firstName,
        lastName: lastName,
        height: height,
        nutritionalGoals: {
          calories: calories,
          protein: protein,
          fat: fat,
          saturates: saturates,
          sugars: sugars,
          salt: salt
        }
      })
        .catch(error => {
          reject(error);
        });

      resolve({ success: true });

    });

  }

  // Get Current User

  getCurrentUser(): Promise<CurrentUser> {

    return new Promise<CurrentUser>((resolve, reject) => {

      const auth = getAuth();

      let currentUser: CurrentUser = {
        email: '',
        height: 0,
        ID: '',
        firstName: '',
        lastName: '',
        nutritionalGoals: {
          calories: 0,
          protein: 0,
          fat: 0,
          saturates: 0,
          sugars: 0,
          salt: 0
        }
      }

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.firestore.collection('users').doc(user.uid).ref.get().then(function (doc) {
            if (doc.exists) {

              currentUser.email = Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("email")],
                currentUser.height = Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("height")],
                currentUser.ID = user.uid,
                currentUser.firstName = Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("firstName")],
                currentUser.lastName = Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("lastName")]
              currentUser.nutritionalGoals = Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("nutritionalGoals")];

            }
            resolve(currentUser);
          })
            .catch(function (error) {
              reject(error);
            });
        }
      });

    });
  }

  // Get All Other Users

  getAllOtherUsers(): Promise<User[]> {

    return new Promise<User[]>((resolve, reject) => {

      const auth = getAuth();

      let otherUsers: Array<User> = [];

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.firestore.collection('users').ref.get().then((data) => {

            data.docs.forEach((doc) => {
              if (user.uid != String(doc.ref.id)) {
                otherUsers.push({
                  ID: String(doc.ref.id),
                  firstName: Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("firstName")],
                  lastName: Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("lastName")]
                });
              }

            });
            resolve(otherUsers);
          })
            .catch(function (error) {
              reject(error);
            });
        }
      });

    });

  }

  // Create Meal

  createMeal(title: string, imageURL: string, itemInfos: ItemInfo[], createdBy: User): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      this.firestore.collection('meals').add({
        title: title,
        imageURL: imageURL,
        itemInfos: itemInfos,
        createdBy: createdBy.ID
      })
        .catch(error => {
          reject(error);
        });

      resolve({ success: true });

    });

  }

  // Get All Meals

  getAllMeals(user: User): Promise<Meal[]> {

    return new Promise<Meal[]>((resolve, reject) => {

      let meals: Array<Meal> = [];

      this.firestore.collection('meals').ref.where("createdBy", "==", user.ID).get().then((data) => {

        data.docs.forEach((doc) => {

          meals.push({
            ID: String(doc.ref.id),
            title: Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("title")],
            imageURL: Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("imageURL")],
            createdBy: user,
            itemInfos: Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("itemInfos")]
          });

        });
        resolve(meals);
      })
        .catch(function (error) {
          reject(error);
        });

    });

  }

  // Create Food Diary Entry

  createFoodDiaryEntry(meal: string, date: Date, createdBy: User): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      date.setHours(0, 0, 0, 0);

      this.firestore
        .collection('foodDiaryEntries', (ref) =>
          ref.where('createdBy', '==', createdBy.ID).where('date', '==', date)
        )
        .get()
        .toPromise()
        .then((querySnapshot: any) => {
          if (querySnapshot.empty) {

            this.firestore.collection('foodDiaryEntries').add({
              meals: [meal],
              date: date,
              createdBy: createdBy.ID,
            })
              .then(() => {
                resolve({ success: true });
              })
              .catch((error) => {
                reject(error);
              });
          } else {

            const docRef = querySnapshot.docs[0].ref;
            const existingMealIds = querySnapshot.docs[0].data().meals || [];
            const updatedMealIds = [...existingMealIds, meal];

            docRef
              .update({
                meals: updatedMealIds,
              })
              .then(() => {
                resolve({ success: true });
              })
              .catch((error: any) => {
                reject(error);
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Get Food Diary Entry

  getFoodDiaryEntry(user: User, date: Date): Promise<FoodDiaryEntry> {

    return new Promise<FoodDiaryEntry>((resolve, reject) => {

      let foodDiaryEntry: FoodDiaryEntry = {
        ID: '',
        meals: [],
        date: date,
        createdBy: user
      };

      date.setHours(0, 0, 0, 0);

      this.firestore.collection('foodDiaryEntries').ref.where("createdBy", "==", user.ID).where('date', '==', date).get().then((data) => {

        data.docs.forEach((doc) => {

          let date;
          let meals: Array<Meal> = [];

          let mealIDs: Array<string> = (Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("meals")]);

          mealIDs.forEach((mealID) => {

            this.firestore.collection('meals').doc(mealID).ref.get().then(function (doc) {

              meals.push({
                ID: mealID,
                title: Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("title")],
                imageURL: Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("imageURL")],
                createdBy: user,
                itemInfos: Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("itemInfos")]
              });

            });

          });

          if (Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("date")] instanceof Timestamp) {
            date = (Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("date")]).toDate();
          }
          foodDiaryEntry = {
            ID: String(doc.ref.id),
            meals: meals,
            date: date,
            createdBy: user
          };

        });
        resolve(foodDiaryEntry);
      })
        .catch(function (error) {
          reject(error);
        });

    });
  }

  // Refresh Food Diary

  refreshFoodDiary() {

    this.foodDiaryRefreshEvent.next(true);

  }

  // Create Weight Diary Entry

  createWeightDiaryEntry(weight: number, date: Date, createdBy: User): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      date.setHours(0, 0, 0, 0);

      this.firestore.collection('weightDiaryEntries').add({
        weight: Math.round(weight * 10) / 10,
        date: date,
        createdBy: createdBy.ID
      })
        .catch(error => {
          reject(error);
        });

      resolve({ success: true });

    });

  }

  // Get All Weight Diary Entries

  getAllWeightDiaryEntries(user: User): Promise<WeightDiaryEntry[]> {

    return new Promise<WeightDiaryEntry[]>((resolve, reject) => {

      let weightDiaryEntries: Array<WeightDiaryEntry> = [];

      this.firestore.collection('weightDiaryEntries').ref.where("createdBy", "==", user.ID).get().then((data) => {

        data.docs.forEach((doc) => {

          let date;

          if (Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("date")] instanceof Timestamp) {
            date = (Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("date")]).toDate();
          }
          weightDiaryEntries.push({
            ID: String(doc.ref.id),
            weight: parseFloat(Object.values(doc.data()!)[Object.keys(doc.data()!).indexOf("weight")]),
            date: date,
            createdBy: user
          });

        });
        weightDiaryEntries.sort((a, b) => (a.date).getTime() - (b.date).getTime())
        resolve(weightDiaryEntries);
      })
        .catch(function (error) {
          reject(error);
        });

    });
  }

  // Refresh Weight Graph

  refreshWeightGraph() {

    this.weightGraphRefreshEvent.next(true);

  }
}
