import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export interface IProfile {
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public user: IProfile = {
    firstName: '',
    lastName: '',
    username: '',
    age: null,
    email: '',
  };

  public prevUser: IProfile;
  public errorTexts: string[] = [];

  languages = {
    en: 'English',
    sp: 'Spanish',
    gr: 'German',
  };

  constructor(public translate: TranslateService) {}

  getLanguages() {
    return this.languages;
  }

  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName: 'Akshay',
            lastName: 'Menon',
            username: 'akshay.menon',
            age: 26,
            email: '',
          };
          //store the value in a backup variable, incase generate email fails
          this.prevUser = { ...this.user };
          resolve(this.user);
        } else {
          reject({ error: 'profile' });
        }
      }, Math.random() * 5000);
    });
  }

  setName(profileData: string[]) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          //if set name is successful, update the model
          this.user.firstName = profileData['name'].firstName;
          this.user.lastName = profileData['name'].lastName;

          //then update the email
          //set name resolves only if set email is successful
          this.setUserEmail(profileData).then(
            (response) => {
              this.prevUser = { ...this.user };
              resolve(this.user);
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject({ error: 'name' });
        }
      }, Math.random() * 5000);
    });
  }

  setUserEmail(profileData: string[]) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.email =
            profileData['name'].firstName
              .replace(/ +/g, '')
              .trim()
              .toLowerCase() +
            '.' +
            profileData['name'].lastName
              .replace(/ +/g, '')
              .trim()
              .toLowerCase() +
            '@blueface.com';
          resolve(this.user);
        } else {
          reject({
            error: 'email',
            previousUser: this.prevUser,
          });
        }
      }, Math.random() * 5000);
    });
  }
}
