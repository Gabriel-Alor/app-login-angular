import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent {

  public miFormulario: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]]
  });

  constructor( private fb: FormBuilder, private router: Router, public authService: AuthService ) {}


  public registro() {
    console.log( this.miFormulario.value );
    const { name, email, password } = this.miFormulario.value;

    this.authService.registrarNuevoUsuario( name, email, password )
        .subscribe({
          next: ( logueado ) => {
            if( logueado === true ) {
              this.router.navigateByUrl('/dashboard');
            }else{
              console.log(logueado);

              Swal.fire('Error', String(logueado), 'error');
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
  }
}
