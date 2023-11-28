import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, public fireauth: AngularFireAuth) { }

  // Upload Image

  async uploadImage(image: File): Promise<String> {

    return new Promise<String>(async (resolve, reject) => {

      const formData = new FormData();
      formData.append('image', image);

      let imageURL = "";

      this.fireauth.authState.subscribe((user) => {

        if (user) {

          user.getIdToken()
            .then((token) => {

              this.http.post(environment.serverURL + '/uploadImage', formData, { headers: new HttpHeaders().set('token', token) }).toPromise()
                .then((response) => {
                  let urlNotCropped = Object.values(response!)[Object.keys(response!).indexOf("imageURL")];
                  imageURL = urlNotCropped.slice(0, 49) + "w_1000,h_1000,c_fill,g_auto/" + urlNotCropped.slice(49);
                  resolve(imageURL);
                })
                .catch((error) => {
                  reject(error);
                });

            });

        }
        else {
          reject("User not found");
        }

      });

    });

  }
}
