import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser$: Observable<string | null>;

  private registeredUsers: { [username: string]: string } = {};

  constructor() {
    this.currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('currentUser'));
    this.currentUser$ = this.currentUserSubject.asObservable();

    // Load registered users from local storage
    const registeredUsersJson = localStorage.getItem('registeredUsers');
    if (registeredUsersJson) {
      this.registeredUsers = JSON.parse(registeredUsersJson);
    }
  }

  register(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      // Check if username already exists
      if (this.registeredUsers.hasOwnProperty(username)) {
        observer.next(false); // Registration failed - username already exists
        observer.complete();
        return;
      }

      // Register the user
      this.registeredUsers[username] = password;
      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));

      observer.next(true); // Registration successful
      observer.complete();
    });
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      // Check if username exists and password matches
      if (this.registeredUsers.hasOwnProperty(username) && this.registeredUsers[username] === password) {
        localStorage.setItem('currentUser', username);
        this.currentUserSubject.next(username);
        observer.next(true); // Login successful
      } else {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        observer.next(false); // Login failed
      }
      observer.complete();
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getLoggedInSubject(): Observable<boolean> {
    return this.currentUser$.pipe(
      map((currentUser) => currentUser !== null)
    );
  }

}
