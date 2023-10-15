import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';
import { LogoutService } from 'src/app/shared/services/logout/logout.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  data: any;
  updateRef!: Subscription;
  notifications: string[] = ['Erro ao carregar equipe.', 'Erro ao atualizar equipe.', 'Erro ao cadastrar equipe.'];

  challengeList: string[] = ['desafio1', 'desafio2', 'desafio3'];
  challenge: string = '';
  type: string = 'ENVIAR';

  criteria = [
    { name: 'Critério 1', grade: 7.5 },
    { name: 'Critério 2', grade: 9.0 },
    { name: 'Critério 3', grade: 6.8 },
    { name: 'Critério 4', grade: 8.4 },
    { name: 'Critério 5', grade: 9.8 },
  ];

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _httpService: HttpService, private _updateService: UpdateService, private _logoutService: LogoutService) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.buildForm();
    this.getProject();
    this.updateRef = this._updateService.update
      .subscribe({
        next: (response: string) => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();

          if (this.notifications.every(notification => notification !== response)) this.getProject();
        }
      });
  }

  ngOnDestroy(): void { this.updateRef.unsubscribe(); }

  buildForm(): void {
    this.form = this._fb.group({
      id: [],
      team: '',
      language: '',
      proposition: '',
      projectName: '',
      projectDescription: ''
    });
  }

  getProject(): void {
    this._httpService.getById('group/user', this._authService.getUserId(), { responseType: 'json' })
      .subscribe({
        next: (response: any) => { this.edit(this.form, response); console.log(this.form.value)},
        error: (error: any) => {
          this._updateService.notify(this.notifications[0]);
          console.error(error);
        }
      });
  }

  edit(form: FormGroup, response: any): void {
    form.patchValue({
      id: response.id,
      team: response.team,
      language: response.language,
      proposition: response.proposition,
      projectName: response.projectName,
      projectDescription: response.projectDescription
    });
  }

  onSubmit(data: any): void {
    this._httpService.putById('group', data.id, data, { responseType: 'text' })
      .subscribe({
        next: () => {
          this._updateService.notify('Equipe cadastrada com sucesso.', true);
          this.type = 'EDITAR';
        },
        error: (error: any) => {
          this._updateService.notify(this.notifications[1]);
          console.error(error);
        }
      });
  }

  logout(): void { this._logoutService.logout(); }
}
