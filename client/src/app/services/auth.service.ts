import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service'; // Update with the correct path
import { CookieService } from 'ngx-cookie-service';
import * as bcrypt from 'bcryptjs'; // Import bcryptjs

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

  // Login method with password hashing check
  login(email: string, password: string, rememberMe: boolean) {
    this.userService.getAllUsers().subscribe(async (users) => {
      const user = users.find((u) => u.email === email);

      if (user) {
        // Compare the input password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Store the user details in local storage upon successful login
          localStorage.setItem('currentUser', JSON.stringify(user));

          if (rememberMe) {
            // Store email, password (still in plain text), and rememberMe in cookies to expire in 90 days
            this.cookieService.set('email', email, 90);
            this.cookieService.set('password', password, 90); // Note: Consider hashing password in cookies for security
            this.cookieService.set('rememberMe', 'true', 90);
          } else {
            // Delete cookies if rememberMe is false (unchecked)
            this.cookieService.delete('email');
            this.cookieService.delete('password');
            this.cookieService.delete('rememberMe');
          }

          // Update logged in state and navigate to dashboard
          this.isLoggedInSubject.next(true);
          this.userService.setCurrentUser(user);
          alert('Logged in successfully');
          this.router.navigate(['/dashboard']);
        } else {
          // Password mismatch
          alert('Invalid credentials');
        }
      } else {
        // Email not found
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
