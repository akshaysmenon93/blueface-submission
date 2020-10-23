import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IProfile, ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  profileForm: any;
  disableInputs: boolean = true;

  //below object is passed as an input to the child <display-message> component
  displayObject = {
    message: '',
    error: '',
  };

  constructor(
    public profileService: ProfileService,
    public fb: FormBuilder,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      email: [''],
      username: [''],
    });

    this.getProfile();
  }

  setMessage(message: string, error: string) {
    this.displayObject = {
      message: message,
      error: error,
    };
  }

  getProfile() {
    //sets the loading message
    this.setMessage('loading', '');

    //call service to fetch profile
    this.profileService.getProfileUser().then(
      (response) => {
        //resets the loader message
        this.setMessage('', '');
        this.disableInputs = null;
        this.profileForm.controls['name'].patchValue(response);
        this.profileForm.patchValue(response);
      },
      (error) => {
        //sets the errror message
        this.setMessage('error', error['error']);

        setTimeout(() => {
          this.getProfile();
        }, 500);
      }
    );
  }

  saveProfile() {
    //display the saving profile... message
    this.setMessage('save', '');
    this.profileService.setName(this.profileForm.value).then(
      (response) => {
        this.profileForm.get('name').markAsPristine();
        this.setMessage('', '');
        this.profileForm.controls['name'].patchValue(response);
        this.profileForm.patchValue(response);
      },
      (error) => {
        this.setMessage('error', error['error']);
        this.profileForm.get('name').markAsPristine();

        if (error['previousUser']) {
          //patch the previous user
          this.profileForm.controls['name'].patchValue(error['previousUser']);
          this.profileForm.patchValue(error['previousUser']);
        }
      }
    );
  }

  changeLanguage(language) {
    this.translate.use(language);
  }
}
