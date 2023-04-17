import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    * {
      margin: 15px;
    }

  `]
})
export class DashboardComponent {

  // los getter reaccionan al ciclo de vida de angular por lo que siempre que se modifique el usuario cambiara en todos lado
  public get usuario() {
    return this.authService.usuario;
  }

  constructor( private router: Router, private authService: AuthService ) {}


  public logout() {
    this.router.navigateByUrl('/auth/login');
    this.authService.logout();
  }
}
