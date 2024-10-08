import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  of,
  map,
  catchError,
  throwError,
} from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api/users';

  // Define the currentUserSubject as a BehaviorSubject
  private currentUserSubject: BehaviorSubject<User | null>;
  // Define currentUser$ as an Observable for the current user
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient) {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      currentUser ? JSON.parse(currentUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Method to get the current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Set the current user and update localStorage
  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(user);
  }

  // Get the current user value
  getCurrentUsers(): Observable<User[]> {
    return this.getAllUsers(); // Call the existing method to fetch users
  }

  // Create a new user
  createUser(userData: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<any>(`${this.baseUrl}/create-new`, userData, { headers })
      .pipe(
        map((res: User): User => {
          return res;
        }),
        catchError((error) => {
          console.error('Error creating user:', error); // Log the error
          return throwError(
            () => new Error('Failed to create user. Please try again later.')
          );
        })
      );
  }

  // Get a user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<any>(`${this.baseUrl}`).pipe(
      map((res) => res.data), // Extract the 'data' property
      catchError((error) => {
        console.log('Error fetching users:', error); // Log the error
        return throwError(
          () => new Error('Failed to fetch users. Please try again later.')
        ); // Return an observable error
      })
    );
  }

  // Update a user by ID
  updateUser(id: number, userData: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update/${id}`, userData);
  }

  // Delete a user by ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Verify user password (if you choose to implement it)
  verifyPassword(
    id: number,
    passwordData: { password: string }
  ): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseUrl}/${id}/verify-password`,
      passwordData
    );
  }

  // Logout and clear the user from localStorage
  logout(): void {
    localStorage.removeItem('currentUser');
    this.setCurrentUser(null); // Clears the current user in the BehaviorSubject
  }

  // Error handling method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
