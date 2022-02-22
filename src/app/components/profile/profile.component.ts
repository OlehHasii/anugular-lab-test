import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl(
      this.loginService.userEmail,
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])
    ),
    age: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ])
    ),
  });
  editMode = false;

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    //const localUser = JSON.parse(sessionStorage.getItem('userData'));
    const localUser = this.loginService.user;
    if (localUser) {
      this.profileService.getProfile().subscribe((respone) => {
        if (respone) {
          this.profileForm.setValue({
            ...respone,
          });
        }
      });
    }
    this.profileForm.disable();

    this.profileService.profUser.subscribe();
  }

  onSubmit() {
    this.profileService.saveProfile(this.profileForm.value).subscribe();
    this.editMode = false;
    this.profileForm.disable();
  }
  onEditMode() {
    this.editMode = true;
    this.profileForm.enable();
  }
}
