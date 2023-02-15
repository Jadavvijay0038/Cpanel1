import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class UniqueNumberValidator implements AsyncValidator {
    constructor() { }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const inputtedNumber = control.value;
        return this.getMyData().pipe(
            map((data: { mobile: any }[]) => ({ numberExists: data.some(d => d.mobile === inputtedNumber) })),
            map((validationResult) => {
                if (validationResult.numberExists) {
                    return { numberExists: true };
                } else {
                    return null;
                }
            })
        );
    }

    getMyData(): Observable<{ mobile: any }[]> {
        try {
            const data = JSON.parse(localStorage.getItem('userdata') || '[]');
            return of(data);
        } catch (err) {
            return throwError(err);
        }
    }
}

export class UniqueEmailValidator implements AsyncValidator {
    constructor() { }
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const inputtedEmail = control.value;
        return this.getMyData().pipe(
            map((data: { email: any }[]) => {
                const emailExists = data.some(d => d.email.toLowerCase() === inputtedEmail.toLowerCase());
                if (emailExists) {
                    return { emailExists: true };
                } else {
                    return null;
                }
            })
        );
    }

    getMyData(): Observable<{ email: any }[]> {
        try {
            const data = JSON.parse(localStorage.getItem('userdata') || '[]');
            return of(data);
        } catch (err) {
            return throwError(err);
        }
    }
}
