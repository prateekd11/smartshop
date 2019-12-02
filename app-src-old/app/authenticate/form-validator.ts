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
        if(password != confirmPassword)
            return {passwordsMustMatch : true};
        return null;
    }
}