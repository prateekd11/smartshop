import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FormValidator {
    static cannotContainSpace(control:AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >=0 )
            return {cannotContainSpace : true};
        return null;
    }

    static passwordsMustMatch (control: AbstractControl) : ValidationErrors | null {
        let password = control.get('password').value;
        let confirmPassword = control.get('confirmPassword').value;
        if(password.length != confirmPassword.length){
            if(password != confirmPassword){
                control.get('confirmPassword').setErrors({ passwordsMustMatch: true });
                return {passwordsMustMatch : true};
            }
        }
        return null;
    }

    static ageNotValid (control: AbstractControl) : ValidationErrors | null {
        if(control.value< 1 || control.value>99) {
            return {ageNotValid: true};
        }
    }

    static invalidPhone(control: AbstractControl) : ValidationErrors | null {
        let phone: string = control.value;
        if(phone.length < 10 || phone.length >10){
            return {invalidPhone:true};
        }
        return null;
    }

    static quantityNotValid (control: AbstractControl) : ValidationErrors | null {
        if(control.value< 1 || control.value>99) {
            return {ageNotValid: true};
        }
    }

}