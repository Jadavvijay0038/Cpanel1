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
  isNewUser: boolean = true;
  updateindex: any;
  constructor(private fb: FormBuilder,
    private router: Router,
    private uniqueNumberValidator: UniqueNumberValidator,
    private UniqueEmailValidator: UniqueEmailValidator,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.AlluserData = JSON.parse(localStorage.getItem('userdata') || '[]');

    this.RegistrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email], [this.UniqueEmailValidator.validate.bind(this.UniqueEmailValidator)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')], [this.uniqueNumberValidator.validate.bind(this.uniqueNumberValidator)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      hobbies: '',
      usertype: 0
    }, { validators: this.passwordMatchValidator });

    this.route.queryParams.subscribe(params => {
      this.updateindex = params['index'];
      if (this.updateindex !== undefined) {
        let userdata = JSON.parse(localStorage.getItem('userdata') || '[]');
        userdata.splice(this.updateindex, 1);
        localStorage.setItem('userdata', JSON.stringify(userdata));
        this.isNewUser = false;
        this.RegistrationForm.patchValue(this.AlluserData[this.updateindex]);
      } else {
        this.isNewUser = true;
      }
    });

    this.RegistrationForm.get('dob')?.valueChanges.subscribe(x => {
      const dob = new Date(x);
      const date = new Date();
      if (dob > date) {
        alert('Please select a valid date of birth.');
        this.RegistrationForm.get('dob')?.setValue('1990-01-01');
      }
    });
  }

  onHobbiesChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const hobbies = this.RegistrationForm.get('hobbies');
    let a = hobbies?.value ? hobbies.value.split(',') : [];
    if (checkbox.checked) {
      a.push(checkbox.value);
    } else {
      a = a.filter((value: string) => value !== checkbox.value);
    }
    this.RegistrationForm.get('hobbies')?.setValue(a.join(','));
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
    if (this.RegistrationForm.valid) {
      try {
        let userdata = JSON.parse(localStorage.getItem('userdata') || '[]');
        if (this.isNewUser) {
          userdata.push(this.RegistrationForm.value);
          alert('User registered successfully!');
          this.router.navigate(['login']);
        } else {
          userdata.splice(this.updateindex, 1, this.RegistrationForm.value);
          this.router.navigate(['list']);
        }
        localStorage.setItem('userdata', JSON.stringify(userdata));
      } catch (error) {
        console.error('Error retrieving or storing userdata:', error);
      }
    } else {
      alert('Please fill in the required details.');
    }
  }
}
