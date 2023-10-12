import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UpdateService } from 'src/app/shared/services/update/update.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  showPassword: boolean = false;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _appRouting: AppRoutingModule, private _updateService: UpdateService) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.buildForm();
    this._updateService.update
      .subscribe({
        next: () => { this.toast.notification = this._updateService.getNotification(); }
      });
  }

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
          error: () => {
            this._updateService.notify('Usuário não autorizado.');
            this.toast.showToast();
          }
        });
    }
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
}
