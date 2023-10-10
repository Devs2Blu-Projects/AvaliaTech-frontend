import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  showPassword: boolean = false;

  constructor(private _fb: FormBuilder, private _authService: AuthService) { }

  ngOnInit(): void { this.buildForm(); }

  buildForm(): void {
    this._fb.group({
      username: '',
      password: ''
    });
  }

  onLogin(creds: any): void {
    if (this.form.valid) {
      this._authService.login(creds.username, creds.password)
        .subscribe({
          next: (response) => { localStorage.setItem('token', response.token); },
          error: (error: any) => { console.error(error); }
        });
    }
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
}
