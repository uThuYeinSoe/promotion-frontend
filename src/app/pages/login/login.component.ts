import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from '../../component/custom-input/custom-input.component';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule, CommonModule, CustomInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  randomIdType = 'text';
  randomIdName = 'Random Id';
  randomId = '';

  passwordType = 'text';
  passwordName = 'Password';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userData: UserDataService,
    private profileService: ProfileService
  ) {}

  login() {
    console.log(this.randomId);
    console.log(this.password);
    this.authService
      .login({
        randomId: this.randomId,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          console.log('Login Success!', res);
          this.randomId = '';
          this.password = '';

          sessionStorage.setItem('token', res.token);
          console.log(res);
          this.userData.setRandomId(res.randomId);

          this.profileService.getUserProfile().subscribe({
            next: (res) => {
              this.userData.setRole(res.role);
              this.userData.setSideMenu(res.sideMenus);
              this.userData.setGame(res.gameResponseObjList);
              this.userData.setGameAuthority(res.agentGameAuthorityList);

              this.userData.getUserObservable().subscribe((userData) => {
                console.log(userData);
              });
            },
            error: (err) => {
              console.log('Profile Error!', err);
            },
          });

          this.router.navigate(['/main']);
        },
        error: (err) => {
          console.log('Login Failed', err);
        },
      });
  }
}
