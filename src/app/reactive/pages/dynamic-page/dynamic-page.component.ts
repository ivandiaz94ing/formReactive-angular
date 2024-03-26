import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  constructor(private fb: FormBuilder){}

  public newFavorite : FormControl = new FormControl('', Validators.required);

  public formulario : FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required ],
      ['Death Stranding', Validators.required ],
    ]),
  });

  onSubmit(): void{
    if(!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      return;
    }
    console.log(this.formulario.value);
    (this.formulario.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.formulario.reset();
  }

  get favoriteGames(){
    // return this.formulario.controls['favoriteGames'].value;
    return this.formulario.get('favoriteGames') as FormArray;
  }

  isValidField( field: string): boolean | null{
    return this.formulario.controls[field].errors
    && this.formulario.controls[field].touched
  }
  isValidFieldInArray( formArray: FormArray, index:number): boolean | null{
    return formArray.controls[index].errors
    && formArray.controls[index].touched
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

  onDeleteFavorite( index : number ) : void {
    //como en js todo pasa por referencia
    this.favoriteGames.removeAt(index);
  }

  onAddFavorite() : void {
      if (this.newFavorite.invalid) return;
      const newGame =   this.newFavorite.value;
      this.favoriteGames.push(  this.fb.control(newGame, Validators.required) );
      this.newFavorite.reset();

  }

}
