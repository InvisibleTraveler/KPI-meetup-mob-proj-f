import { Injectable } from '@angular/core';
import { CanActivateChild, Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | Promise<boolean> {
    if (this.authService.Token) {
      return true;
    } else {
      return true;
      // test splash screen and guard
      return new Promise(res => {
        res(false);
      }).then((res: boolean) => {
        if (!res) {
          this.router.navigate(['login']);
        }
        return res;
      });
    }
  }

  canActivateChild(): boolean | Promise<boolean> {
    return this.canActivate();
  }
}
