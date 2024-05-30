import { Injectable } from '@angular/core';
import { Observable,Observer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() {
  }


  SingUp(userData:JSON){
    console.log(userData);
  }
}
