import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string = 'Vous êtes connecté. (admin/admin)';
  name: string = "admin";
  password: string = "admin";

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  setMessage() {
    this.message = this.authService.isLoggedIn ? 'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect';
  }

  login() {
    this.message = 'Tetative de connexion en cours...';
    this.authService.login(this.name, this.password).subscribe(() => {
      this.setMessage();

      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/pokemon/all';
        this.router.navigate([redirect]);
      } else {
        this.password = '';
      }
    })
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

}
