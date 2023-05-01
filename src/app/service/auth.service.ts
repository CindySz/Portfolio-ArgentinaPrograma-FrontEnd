import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  login({ email, password }: any): Observable<any> {

    

    
    if (email === 'test@gmail.com' && password === 'test123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ name: 'test', email: 'test@gmail.com' });
    }
    return throwError(new Error('Failed to login'));




    
  }
}
