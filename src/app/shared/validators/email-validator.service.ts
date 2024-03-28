import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors, } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class EmailValidatorService implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    //CREA UN OBSERVABLE MANUALMENTE
    const httpCallObservable = new Observable<ValidationErrors | null>((suscriber) => {
      console.log({ email });
      if (email === 'chovan68@gmail.com') {
        suscriber.next({ emailTaken: true });
        suscriber.complete();
        //return;
      }
      suscriber.next(null);
      suscriber.complete();
    }).pipe(
      delay(3000)
    )
    return httpCallObservable;
  }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log({ email });

  //   return of({
  //     emailTake: true,
  //   }).pipe(delay(2000));
  // }


//   return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
// .pipe(
//   // delay(3000),
//   map( resp => {
//     return ( resp.length === 0 )
//         ? null
//         : { emailTaken: true }
//   })
// );

}
