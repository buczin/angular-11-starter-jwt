import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;
  roles: string[] = [];
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(
    private http: HttpClient,
    private token: TokenStorageService
  ) { this.isLoggedIn.next(false); }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/auth/signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post('/api/auth/signup', {
      username,
      password
    }, httpOptions);
  }

  logout(): void {
    window.localStorage.clear();
    window.location.reload();
  }

  isLogged(){
    this.isLoggedIn.next(!!this.token.getToken());
    this.currentUser = this.token.getUser();
  }

}
