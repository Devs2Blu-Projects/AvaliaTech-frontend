import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UpdateService } from 'src/app/shared/services/update/update.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  updateRef!: Subscription;
  isLoggingIn: boolean = false;
  showPassword: boolean = false;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _appRouting: AppRoutingModule, private _updateService: UpdateService) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.buildForm();
    this.updateRef = this._updateService.update
      .subscribe({
        next: () => {
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();
        }
      });
  }

  ngOnDestroy(): void { this.updateRef.unsubscribe(); }

  buildForm(): void {
    this.form = this._fb.group({
      username: new URLSearchParams(window.location.search).get('username') ?? '',
      password: ''
    });
  }

  onLogin(creds: any): void {
    this.isLoggingIn = true;
    if (this.form.valid) {
      this._authService.login(creds.username, creds.password)
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response);
            this._appRouting.refresh();
            this._appRouting.homepage();
            this.isLoggingIn = false;
          },
          error: () => {
            this._updateService.notify('Usuário não autorizado.');
            this.isLoggingIn = false;
          }
        });
    }
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
}
