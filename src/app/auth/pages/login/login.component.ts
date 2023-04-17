import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swall from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  public miFormulario: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email ]],
    password: ['123456', [Validators.required, Validators.minLength(6) ]]
  });

  constructor( private fb: FormBuilder, private router: Router, private authService: AuthService ) {}

  public login() {
    console.log( this.miFormulario.value );

    const { email, password } = this.miFormulario.value;

    this.authService.login( email, password )
        .subscribe({
          next: (logueado) => {
            if( logueado === true ) {
              this.router.navigateByUrl('/dashboard');
            }else {
              // TODO: Mostrar mensaje de error
              Swall.fire('Error', logueado, 'error');
            }
          },
          error: ( err ) => {
            console.log(err);
          }
         })
  }
}
