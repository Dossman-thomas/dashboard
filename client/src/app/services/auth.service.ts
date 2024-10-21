import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private userService: UserService, 
    private router: Router, 
    private cookieService: CookieService
  ) {
    this.checkInitialAuthState();
    window.addEventListener('popstate', this.handlePopStateEvent.bind(this));
  }

  private checkInitialAuthState() {
    const token = localStorage.getItem('token');
    this.isLoggedInSubject.next(!!token);
  }

  private handlePopStateEvent() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isLoggedInSubject.next(false); 
      this.router.navigate(['/login']);
    }
  }

  // Updated login method to handle JWT token
  login(email: string, password: string, rememberMe: boolean) {
    const loginData = { email, password };
    const headers = { 'Content-Type': 'application/json' };

    this.http.post<any>('http://localhost:5000/api/auth/login', loginData, { headers })
      .subscribe(response => {
        const { token, user } = response.data;

        // Store the token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));

        if (rememberMe) {
          this.cookieService.set('email', email, 90);
          this.cookieService.set('password', password, 90);
          this.cookieService.set('rememberMe', 'true', 90);
        } else {
          this.cookieService.delete('email');
          this.cookieService.delete('password');
          this.cookieService.delete('rememberMe');
        }

        // Update the authentication state and navigate
        this.isLoggedInSubject.next(true);
        this.userService.setCurrentUser(user);
        alert('Logged in successfully');
        this.router.navigate(['/dashboard']);
      }, error => {
        alert('Invalid credentials');
      });
  }

  logout() {
    // clear local storage
    localStorage.removeItem('token'); 
    localStorage.removeItem('currentUser');

    // update authentication state
    this.isLoggedInSubject.next(false);

    // navigate to login page after logout
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');  // Check token presence
  }
}
