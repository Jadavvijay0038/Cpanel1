import { Component, OnInit } from '@angular/core';
import { userdata } from './userdata';
import { Router } from '@angular/router';
import { faker } from '@faker-js/faker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


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
  ngOnInit(): void {
    for(let i=0;i<100;i++){
      let data: userdata = {
        hobbies: faker.helpers.arrayElement(['reading', 'dancing', 'Coding']),
        name: faker.name.fullName(),
        mobile: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        password:faker.internet.password(),
        dob: faker.date.past(20).toISOString(),
        gender: faker.name.sexType(),
        usertype: 0
      }
      this.AlluserData.push(data);
    }
    localStorage.setItem('userdata', JSON.stringify(this.AlluserData));
  }
  title = 'Cpanel';
  Logout() {
    localStorage.setItem('islogin', 'false');
    sessionStorage.removeItem('loginuser')
    this.router.navigate(['./login'])
  }
}
