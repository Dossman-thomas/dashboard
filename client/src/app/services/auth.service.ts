import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service'; // Update with the correct path
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root', // Service is available globally
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private userService: UserService, 
    private router: Router, 
    private cookieService: CookieService
  ) {
    this.checkInitialAuthState();

    // Listen for any window navigation events (like the back button)
    window.addEventListener('popstate', this.handlePopStateEvent.bind(this));
  }

  private checkInitialAuthState() {
    const currentUser = localStorage.getItem('currentUser');
    this.isLoggedInSubject.next(!!currentUser);
  }

  // Handle browser back/forward navigation
  private handlePopStateEvent() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
      this.isLoggedInSubject.next(false); 
      this.router.navigate(['/login']);
    }
  }

  login(email: string, password: string, rememberMe: boolean) {
    this.userService.getUsers().subscribe((users) => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));

        if (rememberMe) {
          // store email, password, and rememberMe in cookies to expire in 90 days
          this.cookieService.set('email', email, 90);
          this.cookieService.set('password', password, 90);
          this.cookieService.set('rememberMe', 'true', 90);
        } else {
          // delete cookies if rememberMe is false(unchecked)
          this.cookieService.delete('email');
          this.cookieService.delete('password');
          this.cookieService.delete('rememberMe');
        }

        this.isLoggedInSubject.next(true);
        this.userService.setCurrentUser(user);
        alert('Logged in successfully');
        this.router.navigate(['/dashboard']);
      } else {
        // Handle invalid credentials
        alert('Invalid credentials');
      }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
