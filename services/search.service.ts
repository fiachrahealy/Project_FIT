import { Injectable } from '@angular/core';
import { Item } from 'interfaces/item.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../src/environments/environment';
import { ItemInfo } from 'interfaces/item-info.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, public fireauth: AngularFireAuth) { }

  // Get Tesco Items

  getTescoItems(query: string): Promise<Item[]> {

    return new Promise<Array<Item>>((resolve, reject) => {

      this.fireauth.authState.subscribe((user) => {

        if (user) {

          user.getIdToken()
            .then((token) => {

              let items: Array<Item> = [];

              this.http.get(environment.serverURL + '/getTescoItems/' + query, { headers: new HttpHeaders().set('token', token) }).subscribe(data => {

                for (let i = 0; i < Object.values(data).length; i++) {

                  let item: Item = {
                    title: String(Object.values(Object.values(data)[i])[Object.keys(Object.values(data)[i]).indexOf("title")]),
                    imageURL: String(Object.values(Object.values(data)[i])[Object.keys(Object.values(data)[i]).indexOf("imageURL")]),
                    productRef: String(Object.values(Object.values(data)[i])[Object.keys(Object.values(data)[i]).indexOf("productRef")])
                  };

                  items.push(item);

                }

                resolve(items);

              });

            });
        }
      });

    });

  }

  // Get Tesco Item Info

  getTescoItemInfo(productRef: string): Promise<ItemInfo> {

    return new Promise<ItemInfo>((resolve, reject) => {

      this.fireauth.authState.subscribe((user) => {

        if (user) {

          user.getIdToken()
            .then((token) => {

              this.http.get(environment.serverURL + '/getTescoItemInfo/' + productRef, { headers: new HttpHeaders().set('token', token) }).subscribe(data => {

                resolve({
                  name: Object.values(data)[Object.keys(data).indexOf("title")],
                  amount: parseFloat(Object.values(data)[Object.keys(data).indexOf("amount")],),
                  unit: Object.values(data)[Object.keys(data).indexOf("unit")],
                  calories: parseFloat(Object.values(data)[Object.keys(data).indexOf("calories")]),
                  protein: parseFloat(Object.values(data)[Object.keys(data).indexOf("protein")]),
                  saturates: parseFloat(Object.values(data)[Object.keys(data).indexOf("saturates")]),
                  salt: parseFloat(Object.values(data)[Object.keys(data).indexOf("salt")]),
                  sugars: parseFloat(Object.values(data)[Object.keys(data).indexOf("sugars")]),
                  fat: parseFloat(Object.values(data)[Object.keys(data).indexOf("fat")])
                });

              },
                error => {
                  reject(error);
                });

            });

        }

      });

    });

  }

  // Get Dunnes Items

  getDunnesItems(query: string): Promise<Item[]> {

    return new Promise<Array<Item>>((resolve, reject) => {

      this.fireauth.authState.subscribe((user) => {

        if (user) {

          user.getIdToken()
            .then((token) => {

              let items: Array<Item> = [];

              this.http.get(environment.serverURL + '/getDunnesItems/' + query, { headers: new HttpHeaders().set('token', token) }).subscribe(data => {

                for (let i = 0; i < Object.values(data).length; i++) {

                  let item: Item = {
                    title: String(Object.values(Object.values(data)[i])[Object.keys(Object.values(data)[i]).indexOf("title")]),
                    imageURL: String(Object.values(Object.values(data)[i])[Object.keys(Object.values(data)[i]).indexOf("imageURL")]),
                    productRef: String(Object.values(Object.values(data)[i])[Object.keys(Object.values(data)[i]).indexOf("productRef")])
                  };

                  items.push(item);

                }

                resolve(items);

              });

            });
        }
      });

    });

  }

  // Get Dunnes Item Info

  getDunnesItemInfo(productRef: string): Promise<ItemInfo> {

    return new Promise<ItemInfo>((resolve, reject) => {

      this.fireauth.authState.subscribe((user) => {

        if (user) {

          user.getIdToken()
            .then((token) => {

              this.http.get(environment.serverURL + '/getDunnesItemInfo/' + productRef, { headers: new HttpHeaders().set('token', token) }).subscribe(data => {

                resolve({
                  name: Object.values(data)[Object.keys(data).indexOf("title")],
                  amount: parseFloat(Object.values(data)[Object.keys(data).indexOf("amount")],),
                  unit: Object.values(data)[Object.keys(data).indexOf("unit")],
                  calories: parseFloat(Object.values(data)[Object.keys(data).indexOf("calories")]),
                  protein: parseFloat(Object.values(data)[Object.keys(data).indexOf("protein")]),
                  saturates: parseFloat(Object.values(data)[Object.keys(data).indexOf("saturates")]),
                  salt: parseFloat(Object.values(data)[Object.keys(data).indexOf("salt")]),
                  sugars: parseFloat(Object.values(data)[Object.keys(data).indexOf("sugars")]),
                  fat: parseFloat(Object.values(data)[Object.keys(data).indexOf("fat")])
                });

              },
                error => {
                  reject(error);
                });

            });

        }

      });

    });

  }

  // Get Aldi Items

  getAldiItems(query: string): Promise<Item[]> {

    return new Promise<Array<Item>>((resolve, reject) => {

      this.fireauth.authState.subscribe((user) => {

        if (user) {

          user.getIdToken()
            .then((token) => {

              let items: Array<Item> = [];

              this.http.get(environment.serverURL + '/getAldiItems/' + query, { headers: new HttpHeaders().set('token', token) }).subscribe(data => {

                for (let i = 0; i < Object.values(data).length; i++) {

                  let item: Item = {
                    title: String(Object.values(Object.values(data)[i])[Object.keys(Object.values(data)[i]).indexOf("title")]),
                    imageURL: String(Object.values(Object.values(data)[i])[Object.keys(Object.values(data)[i]).indexOf("imageURL")]),
                    productRef: String(Object.values(Object.values(data)[i])[Object.keys(Object.values(data)[i]).indexOf("productRef")])
                  };

                  items.push(item);

                }

                resolve(items);

              });

            });

        }

      });

    });

  }

  // Get Aldi Item Info

  getAldiItemInfo(productRef: string): Promise<ItemInfo> {

    return new Promise<ItemInfo>((resolve, reject) => {

      this.fireauth.authState.subscribe((user) => {

        if (user) {

          user.getIdToken()
            .then((token) => {

              this.http.get(environment.serverURL + '/getAldiItemInfo/' + encodeURIComponent(productRef), { headers: new HttpHeaders().set('token', token) }).subscribe(data => {

                resolve({
                  name: Object.values(data)[Object.keys(data).indexOf("title")],
                  amount: parseFloat(Object.values(data)[Object.keys(data).indexOf("amount")],),
                  unit: Object.values(data)[Object.keys(data).indexOf("unit")],
                  calories: parseFloat(Object.values(data)[Object.keys(data).indexOf("calories")]),
                  protein: parseFloat(Object.values(data)[Object.keys(data).indexOf("protein")]),
                  saturates: parseFloat(Object.values(data)[Object.keys(data).indexOf("saturates")]),
                  salt: parseFloat(Object.values(data)[Object.keys(data).indexOf("salt")]),
                  sugars: parseFloat(Object.values(data)[Object.keys(data).indexOf("sugars")]),
                  fat: parseFloat(Object.values(data)[Object.keys(data).indexOf("fat")])
                });

              },
                error => {
                  reject(error);
                });

            });

        }

      });

    });

  }
}
