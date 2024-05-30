import {  FormGroup,ValidationErrors,ValidatorFn,AbstractControl } from '@angular/forms';




export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const controlToMatch = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    if (controlToMatch.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
      return { mustMatch: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}



export function emailcom(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null;
    }

    const emailControl = control.parent.get(controlName);

    if (!emailControl) {
      return null;
    }

    const email = emailControl.value;
    const emailParts = email.split('@');

    if (emailParts[emailParts.length - 1]!== 'gmail.com') {
      control.setErrors({ emailcom: true });
      return { emailcom: true };
    }

    control.setErrors(null);
    return null;
  };
}
