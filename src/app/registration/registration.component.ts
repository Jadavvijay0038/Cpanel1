import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UniqueNumberValidator, UniqueEmailValidator } from './UniqueNumberValidator';
import { ActivatedRoute } from '@angular/router';
import { userdata } from '../userdata';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  RegistrationForm: FormGroup;
  isSubmitted: boolean = false;
  hobbies = [];
  AlluserData: Array<userdata> = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private uniqueNumberValidator: UniqueNumberValidator,
    private UniqueEmailValidator: UniqueEmailValidator,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.AlluserData = JSON.parse(localStorage.getItem('userdata') || '[]');

    
    this.RegistrationForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email], [this.UniqueEmailValidator.validate.bind(this.UniqueEmailValidator)]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')], [this.uniqueNumberValidator.validate.bind(this.uniqueNumberValidator)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      hobbies: new FormControl(''),
      usertype: 0
    }, { validators: this.passwordMatchValidator });

    this.route.queryParams.subscribe(params => {
      this, this.RegistrationForm.setValue(this.AlluserData[params['index']]);
    });
    this.RegistrationForm.get('dob')?.valueChanges.subscribe(x => {
      const dob = new Date(x);
      const date = new Date();
      if (dob > date) {
        alert("please select valid Date of birth");
        this.RegistrationForm.get('dob')?.setValue('1990-01-01');
      }
    })

  }

  onHobbiesChange(event: Event) {
    let a = [];
    const checkbox = event.target as HTMLInputElement;
    const hobbies = this.RegistrationForm.get('hobbies');
    a = hobbies?.value?.split(',');
    if (checkbox.checked) {
      a.push(checkbox.value);
    } else {
      const index = a.findIndex((x: { value: string; }) => x.value === checkbox.value);
      a.splice(index, 1);
    }
    this.RegistrationForm.get('hobbies')?.setValue(a.join(","));
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirm = control.get('confirm');
    if (password?.value !== confirm?.value) {
      confirm?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirm?.setErrors(null);
      return null;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.RegistrationForm.controls);

    if (this.RegistrationForm.valid) {
      try {
        let userdata = JSON.parse(localStorage.getItem('userdata') || '[]')
        userdata.push(this.RegistrationForm.value);
        localStorage.setItem('userdata', JSON.stringify(userdata));
        console.log(this.RegistrationForm.value);
        alert("User Registered Successfully!")
        this.router.navigate(['login']);
      } catch (error) {
        console.error('Error retrieving or storing userdata:', error);
      }
    } else {
      alert("Fill required Details.....");
    }
  }
}
