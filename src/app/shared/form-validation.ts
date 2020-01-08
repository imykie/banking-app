import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';


export function formValidations(pattern: RegExp): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any } | null => {
        const forbidden = pattern.test(control.value);
        return forbidden? {'forbiddenName' : {value : control.value}} :null;
    }
}

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

