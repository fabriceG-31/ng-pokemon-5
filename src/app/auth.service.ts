import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string; // oèù rediriger l'utilsateur après authentification


  login(name: string, password: string) : Observable<boolean> {
    // Appel au service d'authentification
    let isLoggedIn = (name === 'admin' && password === 'admin');

    return of(true).pipe( //return true
      delay(1000), // pause de 1000 ms
      tap(() => this.isLoggedIn = isLoggedIn) // stocke l'état du LoggedIn
    )
  }

  logout(): void {
    this.isLoggedIn = false;

  }
}
