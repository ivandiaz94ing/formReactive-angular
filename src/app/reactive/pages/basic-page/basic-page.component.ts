import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validator.service';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  // public formulario: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // });
  constructor(
    private fb: FormBuilder,
    private validatorService : ValidatorsService,
    ){}

  ngOnInit(): void {
  }

  public formulario : FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0) ] ],
    inStorage: [0, [Validators.required, Validators.min(0) ] ]
  });

  isValidField( field: string){
    return this.validatorService.isValidField(this.formulario,field);
  }

  getFieldError(field: string): string | null {
    if ( !this.formulario.controls[field] ) return null;

    //SINO
    const errores = this.formulario.controls[field].errors || {};
    for (const key of Object.keys(errores)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio';

        case 'minlength':
          return `Este campo requiere minimo ${errores[ 'minlength' ].requiredLength} caracteres. `;
      }
      //  console.log(key);
    }
    return null;

  }

  onSave(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;

    }
    //console.log(this.formulario.value);
    this.formulario.reset({ price: 1, inStorage: 1});
  }

}
