import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  checkUsername(username: string, password: string): boolean {
    const userdata = JSON.parse(localStorage.getItem('userdata') || '[]');
    for (const element of userdata) {
      if (element.email === username || element.mobile === username) {
        if (element.password === password) {
          sessionStorage.setItem('loginuser', JSON.stringify(element));
          return true
        }
      }
    }
    return false;
  }

  checkislogin(){
    return localStorage.getItem('islogin')
  }
}
