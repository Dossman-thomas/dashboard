import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
@Injectable({
  providedIn: 'root', // Service is available globally
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Admin@123!',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'Manager@123!',
      role: 'data manager',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      password: 'Employee@123!',
      role: 'employee',
    },
    // Additional data managers
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily@example.com',
      password: 'Manager@234!',
      role: 'data manager',
    },
    {
      id: 7,
      name: 'Daniel Garcia',
      email: 'daniel@example.com',
      password: 'Manager@345!',
      role: 'data manager',
    },
    {
      id: 8,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      password: 'Manager@456!',
      role: 'data manager',
    },
    {
      id: 9,
      name: 'David Martinez',
      email: 'david@example.com',
      password: 'Manager@567!',
      role: 'data manager',
    },
    {
      id: 10,
      name: 'Laura Anderson',
      email: 'laura@example.com',
      password: 'Manager@678!',
      role: 'data manager',
    },
    {
      id: 11,
      name: 'James Moore',
      email: 'james@example.com',
      password: 'Manager@789!',
      role: 'data manager',
    },
    {
      id: 12,
      name: 'Olivia Taylor',
      email: 'olivia@example.com',
      password: 'Manager@890!',
      role: 'data manager',
    },
    {
      id: 13,
      name: 'Robert Thomas',
      email: 'robert@example.com',
      password: 'Manager@901!',
      role: 'data manager',
    },
    {
      id: 14,
      name: 'Sophia Jackson',
      email: 'sophia@example.com',
      password: 'Manager@012!',
      role: 'data manager',
    },
    {
      id: 15,
      name: 'William White',
      email: 'william@example.com',
      password: 'Manager@1234!',
      role: 'data manager',
    },

    // Additional employees
    {
      id: 16,
      name: 'Liam Harris',
      email: 'liam@example.com',
      password: 'Employee@234!',
      role: 'employee',
    },
    {
      id: 17,
      name: 'Mia Clark',
      email: 'mia@example.com',
      password: 'Employee@345!',
      role: 'employee',
    },
    {
      id: 18,
      name: 'Noah Lewis',
      email: 'noah@example.com',
      password: 'Employee@456!',
      role: 'employee',
    },
    {
      id: 19,
      name: 'Isabella Robinson',
      email: 'isabella@example.com',
      password: 'Employee@567!',
      role: 'employee',
    },
    {
      id: 20,
      name: 'Ethan Walker',
      email: 'ethan@example.com',
      password: 'Employee@678!',
      role: 'employee',
    },
    {
      id: 21,
      name: 'Ava Young',
      email: 'ava@example.com',
      password: 'Employee@789!',
      role: 'employee',
    },
    {
      id: 22,
      name: 'James King',
      email: 'jamesk@example.com',
      password: 'Employee@890!',
      role: 'employee',
    },
    {
      id: 23,
      name: 'Charlotte Scott',
      email: 'charlotte@example.com',
      password: 'Employee@901!',
      role: 'employee',
    },
    {
      id: 24,
      name: 'Benjamin Wright',
      email: 'benjamin@example.com',
      password: 'Employee@012!',
      role: 'employee',
    },
    {
      id: 25,
      name: 'Amelia Green',
      email: 'amelia@example.com',
      password: 'Employee@1234!',
      role: 'employee',
    },
    {
      id: 26,
      name: 'Elijah Adams',
      email: 'elijah@example.com',
      password: 'Employee@2345!',
      role: 'employee',
    },
    {
      id: 27,
      name: 'Harper Baker',
      email: 'harper@example.com',
      password: 'Employee@3456!',
      role: 'employee',
    },
    {
      id: 28,
      name: 'Logan Carter',
      email: 'logan@example.com',
      password: 'Employee@4567!',
      role: 'employee',
    },
    {
      id: 29,
      name: 'Evelyn Mitchell',
      email: 'evelyn@example.com',
      password: 'Employee@5678!',
      role: 'employee',
    },
    {
      id: 30,
      name: 'Jackson Perez',
      email: 'jackson@example.com',
      password: 'Employee@6789!',
      role: 'employee',
    },
    {
      id: 31,
      name: 'Harper Nelson',
      email: 'harper@example.com',
      password: 'Employee@7890!',
      role: 'employee',
    },
    {
      id: 32,
      name: 'Mason Cooper',
      email: 'mason@example.com',
      password: 'Employee@8901!',
      role: 'employee',
    },
    {
      id: 33,
      name: 'Avery Richardson',
      email: 'avery@example.com',
      password: 'Employee@9012!',
      role: 'employee',
    },
    {
      id: 34,
      name: 'Alexander Collins',
      email: 'alexander@example.com',
      password: 'Employee@0123!',
      role: 'employee',
    },
    {
      id: 35,
      name: 'Ella Murphy',
      email: 'ella@example.com',
      password: 'Employee@12345!',
      role: 'employee',
    },
    {
      id: 36,
      name: 'Henry Ward',
      email: 'henry@example.com',
      password: 'Employee@23456!',
      role: 'employee',
    },
  ];

  // Define the currentUserSubject as a BehaviorSubject
  private currentUserSubject: BehaviorSubject<User | null>;

  // Define currentUser$ as an Observable for the current user
  public currentUser$: Observable<User | null>;

  constructor() {
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

  // Get all users
  getUsers(): Observable<User[]> {
    return of(this.users).pipe(
      map((users) => users),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  // Get a user by ID
  getUserById(id: number): Observable<User | undefined> {
    const user = this.users.find((user) => user.id === id);
    return of(user).pipe(catchError(this.handleError<User>('getUserById')));
  }

  // Create a new user
  createUser(user: User): Observable<User> {
    user.id = this.users.length + 1;
    this.users.push(user);
    return of(user).pipe(
      map((newUser) => newUser),
      catchError(this.handleError<User>('createUser'))
    );
  }


  // Update an existing user
  updateUser(updatedUser: User): Observable<User> {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;

      // Update local storage if the updated user is the current user
      const currentUser = this.currentUserSubject.value;
      if (currentUser && currentUser.id === updatedUser.id) {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        this.currentUserSubject.next(updatedUser); // Emit the updated user
      }

      console.log('Updated user:', updatedUser);
    }

    return of(updatedUser).pipe(
      catchError(this.handleError<User>('updateUser'))
    );
  }

  // Delete a user
  deleteUser(userId: number): Observable<void> {
    this.users = this.users.filter((user) => user.id !== userId);
    return of(undefined).pipe(catchError(this.handleError<void>('deleteUser')));
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
  getCurrentUsers(): User[] {
    return this.users;
  }

  // Add a new user to the users array
  addUser(user: User): Observable<void> {
    this.users.push(user);
    return of();
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
