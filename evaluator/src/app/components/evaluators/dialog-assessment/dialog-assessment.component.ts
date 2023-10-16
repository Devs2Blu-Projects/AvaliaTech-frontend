import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-dialog-assessment',
  templateUrl: './dialog-assessment.component.html',
  styleUrls: ['./dialog-assessment.component.scss']
})
export class DialogAssessmentComponent implements OnInit{

  data:any = []
  listCriteria: any = []
  updateRef!: Subscription;
  errorMsg: string = 'Erro ao carregar apresentação.';
  form!: FormGroup;
  
  constructor(private _fb: FormBuilder, private _httpService: HttpService, private _updateService: UpdateService, private _authService:AuthService){}
  @ViewChild(ToastComponent) toast!: ToastComponent;
  
  ngOnInit(): void {
    this.getPresentation();
    this.updateRef = this._updateService.update
      .subscribe({
        next: (response: string) => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();

          if (response !== this.errorMsg) this.getPresentation();
        }
      });
  }

  buildForm(): void {
    this.form = this._fb.group({
      groupId: this.data.id,
      userId: this._authService.getUserId(),
      grades: this._fb.array([]),
    });
    this.listCriteria.forEach(() => {
      (this.form.get('grades') as FormArray).push(new FormControl(0));
    });
  }

   
  getCriteria(): void{
    this._httpService.getAll('criterion/event').subscribe({
      next: (response: any) =>{ this.listCriteria = response;},
      error:( error: any) =>{
        console.error(error);
      }
    })
  }

  getPresentation(): void {
    this._httpService.getById('group/rate/', this._authService.getUserId())
      .subscribe({
        next: (response: any) => { this.data = response; },
        error: (error: any) => {
          this._updateService.notify(this.errorMsg);
          console.error(error);
        }
      });
  }

  onSubmit(data: any) {
    this._updateService.startTimer();
    
      this._httpService.post('rating', data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this._updateService.notify('Nota adicionada com sucesso.', true);
          },
          error: (error: any) => {
            // this._updateService.notify(this.notifications[1]);
            console.error(error);
          }
        });
  }
  checkInvalidNote(criterion:any): boolean {
    return criterion.nota < 0 || criterion.nota > 5;
  }
  
}
