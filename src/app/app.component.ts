import { Component } from '@angular/core';
import { userdata } from './userdata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  AlluserData: Array<userdata> = [];

  defaultUser: userdata = {
    name: "vijay",
    password: "12345",
    mobile: '9725510022',
    email: 'jadavvijay0@gmail.com',
    dob: '06-12-1995',
    gender: 'male',
    usertype: 1,
    hobbies: 'Coding'
  }
  constructor(private router: Router) {
    this.AlluserData.push(this.defaultUser);
    localStorage.setItem('userdata', JSON.stringify(this.AlluserData));
  }
  title = 'Cpanel';
  Logout() {
    localStorage.setItem('islogin', 'false');
    sessionStorage.removeItem('loginuser')
    this.router.navigate(['./login'])
  }
}
