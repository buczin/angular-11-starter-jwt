import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { TokenStorageService } from 'src/app/_services/token/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginFailed = false;
  errorMessage = '';
  submitted = false;
  loading = false;

  formLogin: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn.next(true);
      this.authService.roles = this.tokenStorage.getUser().roles;
      this.router.navigateByUrl('/')
    }
  }

  get f() { return this.formLogin.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;
    const { username, password } = this.formLogin.value;

    this.authService.login(username, password).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.authService.roles = this.tokenStorage.getUser().roles;
        this.isLoginFailed = false;
        this.authService.isLoggedIn.next(true);
        this.loading = false;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isLoginFailed = true;
        this.loading = false;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
