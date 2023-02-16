import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { userdata } from '../userdata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  constructor(private router: Router) { }

  AlluserData: Array<userdata> = [];
  page = 1;
  pageSize = 10;
  totalItems: number = 0
  SearchText: string = ''
  Loginuser: userdata;

  ngOnInit(): void {
    this.Loginuser = JSON.parse(sessionStorage.getItem('loginuser') || '[]');
    this.AlluserData = JSON.parse(localStorage.getItem('userdata') || '[]');
    this.totalItems = this.AlluserData.length
  }

  DeleteUser(i: number) {
    this.AlluserData.splice(i, 1);
    localStorage.setItem('userdata', JSON.stringify(this.AlluserData));
    this.AlluserData = JSON.parse(localStorage.getItem('userdata') || '[]');
    this.totalItems = this.AlluserData.length
  }

  updatedata(i: number) {
    this.router.navigate(['/registration'], { queryParams: { index: i } });
  }
  Logout() {
    localStorage.setItem('islogin', 'false');
    sessionStorage.removeItem('loginuser')
    this.router.navigate(['./login'])
  }
}
