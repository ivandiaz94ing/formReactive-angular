import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validator.service';

@Component({
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
    private validatorService: ValidatorsService){}


  ngOnInit(): void {
    this.formulario.reset(this.person);
  }

  public formulario: FormGroup = this.fb.group({
    gender: ['' , Validators.required],
    wantNotifications: [true, Validators.required],
    termsAddConditions: [false, Validators.requiredTrue]
  });

  public person = {
    gender: 'F',
    wantNotifications: false
  }



//ngSubmit
  onSave(){
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }
    const {termsAddConditions, ... newPerson}= this.formulario.value
    this.person = newPerson;
    console.log(this.person);
    console.log(this.formulario.value);
  }

  isValidField( field: string){
    return this.validatorService.isValidField(this.formulario,field);
  }
}
