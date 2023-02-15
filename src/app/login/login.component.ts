import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  isSubmited: boolean = false;
  constructor(private fb: FormBuilder, 
    private router: Router,
    private AuthService:AuthServiceService) {

  }
  ngOnInit(): void {
    localStorage.removeItem('islogin');
    this.myForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public onSubmit() {
    this.isSubmited = true;
    if (this.myForm.valid) {
      const { email, password } = this.myForm.value;
      const isValid = this.AuthService.checkUsername(email, password);
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
      if (element.email === username || element.mobile === username) {
        if (element.password === password) {
          sessionStorage.setItem('loginuser', JSON.stringify(element));
          return true
        }
      }
    }
    return false;
  }

}
