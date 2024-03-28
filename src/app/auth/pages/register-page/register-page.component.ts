import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validator.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { emailPattern } from 'src/app/shared/validators/valitator';
//import  * as customValidator  from 'src/app/shared/validators/valitator';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailvalidator: EmailValidatorService
  ) {}

  public formulario: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern), ], ],
    email: ['',[Validators.required, Validators.pattern(this.validatorService.emailPattern),], [new EmailValidatorService()],],
    // email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailvalidator] ],
    username: ['', [Validators.required, this.validatorService.CantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required],
  },{
    validator: [
      this.validatorService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  onSubmit() {
    this.formulario.markAllAsTouched();
  }

  isValidField(field: string) {
    // TODO: Obtener validacion desde el servicio
    return this.validatorService.isValidField(this.formulario, field);
  }
}
