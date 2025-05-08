// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export type UserRole = 'jobseeker' | 'employer';
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    /** Nu med role-parameter */
    login(email: string, password: string, role: UserRole): Observable<User> {
        const user: User = { id: 1, name: email.split('@')[0], email, role };
        this.currentUserSubject.next(user);
        return of(user);
    }

    signup(name: string, email: string, password: string, role: UserRole): Observable<User> {
        const user: User = { id: 2, name, email, role };
        this.currentUserSubject.next(user);
        return of(user);
    }

    logout() {
        this.currentUserSubject.next(null);
    }

    get role(): UserRole | null {
        return this.currentUserSubject.value?.role || null;
    }
}
