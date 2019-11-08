import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss']
})
export class RegistrationPage implements OnInit {
  public errMessage: string;
  public registerForm = this.fb.group({
    email: [
      { value: '', disabled: false },
      [Validators.required, Validators.email]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
        )
      ]
    ],
    repeatPass: ['', Validators.required]
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
    const controls = this.registerForm.controls;

    if (this.errMessage && this.registerForm.invalid) {
      if (controls.email.invalid && controls.email.touched) {
        this.errMessage = controls.email.value
          ? 'this is not the email'
          : 'email mustn\'t be empty';
      } else if (controls.password.invalid && controls.password.touched) {
        this.errMessage = controls.password.value
          ? 'password must contain at least 1 capital letter, 1 special symbol and includes more than 8 character'
          : 'password mustn\'t be empty';
      } else if (
        this.registerForm.value.password !==
          this.registerForm.value.repeatPass &&
        controls.password.touched
      ) {
        this.errMessage =
          '\'repeat password\' field must be equal to \'password\' field';
      }
    } else if (
      this.registerForm.value.password !== this.registerForm.value.repeatPass &&
      controls.password.touched
    ) {
      this.errMessage =
        '\'repeat password\' field must be equal to \'password\' field';
    } else {
      this.errMessage = null;
    }
  }

  public handleBlurInput() {
    const controls = this.registerForm.controls;

    if (this.registerForm.invalid) {
      if (controls.email.invalid && controls.email.touched) {
        this.errMessage = controls.email.value
          ? 'this is not the email'
          : 'email mustn\'t be empty';
      } else if (controls.password.invalid && controls.password.touched) {
        this.errMessage = controls.password.value
          ? 'password must contain at least 1 capital letter, 1 special symbol and includes more than 8 character'
          : 'password mustn\'t be empty';
      }
    } else if (
      this.registerForm.value.password !== this.registerForm.value.repeatPass &&
      controls.password.touched
    ) {
      this.errMessage =
        '\'repeat password\' field must be equal to \'password\' field';
    }
  }

  public async registration() {
    const loader = await this.presentLoading();
    const { email, password } = this.registerForm.value;

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
