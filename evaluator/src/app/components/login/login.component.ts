import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  showPassword: boolean = false;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _appRouting: AppRoutingModule) { }

  ngOnInit(): void { this.buildForm(); }

  buildForm(): void {
    this.form = this._fb.group({
      username: '',
      password: ''
    });
  }

  onLogin(creds: any): void {
    if (this.form.valid) {
      this._authService.login(creds.username, creds.password)
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response);
            this._appRouting.refresh();
            this._appRouting.homepage();
          },
          error: (error: any) => {
            console.error(error);
            alert(error.error) // TODO: Apresentar "toast" ou preencher div com o erro
          }
        });
    }
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
}
