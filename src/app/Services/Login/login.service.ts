import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  Login(userAuthData: JSON) {
    console.log(userAuthData);
  }
}
