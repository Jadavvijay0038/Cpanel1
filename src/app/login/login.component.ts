import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface userdata {
  name: string,
  mobileNo: string,
  email: string,
  password: string,
  dob: string,
  gender: string,
  usertype: number
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) { }
  AlluserData: Array<userdata> = [];
  defaultUser: userdata = {
    name: "vijay",
    password: "12345",
    mobileNo: '9725510022',
    email: 'jadavvijay0@gmail.com',
    dob: '06-12-1995',
    gender: 'male',
    usertype: 1
  }

  ngOnInit(): void {
    localStorage.removeItem('islogin');
    this.AlluserData.push(this.defaultUser);
    localStorage.setItem('userdata', JSON.stringify(this.AlluserData));
    this.myForm = this.fb.group({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }

  public onSubmit() {
    if (this.myForm.valid) {
      const { email, password } = this.myForm.value;
      const isValid = this.checkUsername(email, password);
      if (isValid) {
        localStorage.setItem('islogin', 'true');
        this.router.navigate(['/list']);
      } else {
        alert("Invalid Credentials")
      }
    } else {
      alert("Fill Required Details")
    }
  }

  public checkUsername(username: string, password: string): boolean {
    const userdata = JSON.parse(localStorage.getItem('userdata') || '[]');
    for (const element of userdata) {
      if (element.name === username || element.mobileNo === username) {
        return element.password === password;
      }
    }
    return false;
  }

}
