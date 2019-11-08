import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor() {}

  public get Token() {
    return this.token;
  }

  public login(username: string, password: string) {
    return new Promise<boolean>(res => {
      this.token = 'done';
      res(true);
    });
  }
}
