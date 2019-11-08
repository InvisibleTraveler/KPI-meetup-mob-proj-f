import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

// capacitor plugins
import { Plugins } from '@capacitor/core';

const { SplashScreen } = Plugins;

// services
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public errMessage: string;
  public loginForm = this.fb.group({
    email: [{ value: '', disabled: false }, Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    setTimeout(() => SplashScreen.hide(), 1500);
  }

  public handleChangeInput() {
    if (this.errMessage && this.loginForm.invalid) {
      const controls = this.loginForm.controls;

      if (controls.email.invalid && controls.email.touched) {
        this.errMessage = 'email mustn\'t be empty';
      } else if (controls.password.invalid && controls.password.touched) {
        this.errMessage = 'password mustn\'t be empty';
      }
    } else {
      this.errMessage = null;
    }
  }

  public handleBlurInput() {
    if (this.loginForm.invalid) {
      const controls = this.loginForm.controls;

      if (controls.email.invalid && controls.email.touched) {
        this.errMessage = 'email mustn\'t be empty';
      } else if (controls.password.invalid && controls.password.touched) {
        this.errMessage = 'password mustn\'t be empty';
      }
    }
  }

  public async login() {
    const loader = await this.presentLoading();
    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login(email, password);
      loader.dismiss();
      this.router.navigate(['main', 'profile']);
    } catch (err) {
      this.errMessage = err.message;
    }
  }

  private async presentLoading(): Promise<HTMLIonLoadingElement> {
    const loader = await this.loadingController.create({
      cssClass: 'loader'
    });

    await loader.present();

    return loader;
  }
}
