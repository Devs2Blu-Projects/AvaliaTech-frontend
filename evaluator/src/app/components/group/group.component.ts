import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';
import { LogoutService } from 'src/app/shared/services/logout/logout.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  data: any;
  challenges: any = [];
  criteria: any = [];
  updateRef!: Subscription;
  notifications: string[] = ['Erro ao carregar equipe.', 'Erro ao carregar desafios', 'Erro ao carregar critérios', 'Erro ao atualizar equipe.'];
  buttonText: string = 'ENVIAR';

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _httpService: HttpService, private _updateService: UpdateService, private _logoutService: LogoutService) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.buildForm();
    this.getProjectByGroup();
    this.updateRef = this._updateService.update
      .subscribe({
        next: (response: string) => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();

          if (this.notifications.every(notification => notification !== response)) this.getProjectByGroup();
        }
      });
  }

  ngOnDestroy(): void { this.updateRef.unsubscribe(); }

  buildForm(): void {
    this.form = this._fb.group({
      fields: this._fb.group({
        id: [],
        team: '',
        language: '',
        proposition: '',
        projectName: '',
        projectDescription: ''
      })
    });
  }

  getProjectByGroup(): void {
    this._httpService.getById('group/user', this._authService.getUserId(), { responseType: 'json' })
      .subscribe({
        next: (response: any) => {
          this.data = response;
          this.form.get('fields')?.patchValue(response);
          this.getChallengesByEvent(response.eventId);
          this.getCriteriaByEvent(response.eventId);
        },
        error: (error: any) => {
          this._updateService.notify(this.notifications[0]);
          console.error(error);
        }
      });
  }

  getChallengesByEvent(id: number): void {
    this._httpService.getById('event', id, { responseType: 'json' })
      .subscribe({
        next: (response: any) => { this.challenges = response.propositions; },
        error: (error: any) => {
          this._updateService.notify(this.notifications[1]);
          console.error(error);
        }
      });
  }

  getCriteriaByEvent(id: number): void {
    this._httpService.getById('criterion/event', id, { responseType: 'json' })
      .subscribe({
        next: (response: any) => { this.criteria = response; },
        error: (error: any) => {
          this._updateService.notify(this.notifications[2]);
          console.error(error);
        }
      });
  }

  onSubmit(data: any): void {
    this._updateService.startTimer();
    if (this.form.valid) {
      if (this.buttonText === 'ENVIAR') {
        this._httpService.putById('group', data.id, data, { responseType: 'text' })
          .subscribe({
            next: () => { this._updateService.notify('Equipe atualizada com sucesso.', true); },
            error: (error: any) => {
              this._updateService.notify(this.notifications[3]);
              console.error(error);
            }
          });
      }
    }
  }

  handleButtonAction(data: any): void {
    if (this.buttonText === 'ENVIAR') {
      this.onSubmit(data.get('fields')?.value);
      this.form.get('fields')?.disable();
      this.buttonText = 'EDITAR';
    } else {
      this.form.get('fields')?.enable();
      this.buttonText = 'ENVIAR';
    }
  }

  disableForm(): void { this.form.get('fields')?.disable(); }
  enableForm(): void { this.form.get('fields')?.enable(); }

  logout(): void { this._logoutService.logout(); }
}
