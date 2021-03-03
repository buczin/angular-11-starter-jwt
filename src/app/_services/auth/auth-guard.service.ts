import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token/token-storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private auth: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

  canActivate(): boolean {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  public get isAdmin(): boolean {
    if (this.auth.currentUser != null) {
      return this.auth.roles.find((x) => x === 'ROLE_ADMIN') ? true : false;
    } else {
      return false;
    }
  }
}
