import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-form-new-event',
  templateUrl: './form-new-event.component.html',
  styleUrls: ['./form-new-event.component.scss']
})
export class FormNewEventComponent {

  form!: FormGroup;

  errorMsg: string = 'Erro ao carregar eventos.';
  data: any = [];
  filter = '';
  filterCols = [ 'name'];
  type:string = 'CADASTRAR'

  constructor(private _fb: FormBuilder, private _httpService: HttpService, private _updateService: UpdateService) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getAll();
    this._updateService.update
      .subscribe({
        next: (response: any) => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();

          if (response !== this.errorMsg) this.getAll();
        }
      });
      this.buildForm();
  }
  buildForm(): void {
    this.form = this._fb.group({
      id: [],
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      isClosed: [{ value: false, disabled: true }],
      isPublic: [{ value: false, disabled: true }],
    });

    if (this.data) this.form.patchValue(this.data);
  }
  clearForm(): void { 
    this.form.reset(); 
    this.type = 'CADASTRAR'
    this.form.get('isClosed')?.disable();
    this.form.get('isPublic')?.disable();
  }

  onSubmit(data: any) {
    this._updateService.startTimer();
    if (this.form.valid) if (data.id) {
      this._httpService.putById('event', data.id, data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this._updateService.notify('Evento atualizado com sucesso.', true);
            this.type = 'CADASTRAR'
            this.clearForm();
          },
          error: (error: any) => {
            this._updateService.notify('Erro ao atualizar evento.', true);
            console.error(error);
          }
        });
    } else {
      this._httpService.post('event', data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this._updateService.notify('Evento adicionado com sucesso.', true);
            this.clearForm();
          },
          error: (error: any) => {
            this._updateService.notify('Erro ao adicionar evento.', true);
            console.error(error);
          }
        });
    }
  }

  getAll(): void {
    this._httpService.getAll('event')
      .subscribe({
        next: (response: any) => { this.data = response; },
        error: (error: any) => {
          this._updateService.notify(this.errorMsg);
          console.error(error);
        }
      });
  }

  edit(data: any): void {
    this.type = 'EDITAR'
    this.form.patchValue(data)
    const startDateControl = this.form.get('startDate');
    const endDateControl = this.form.get('endDate');

    const startDateString = new Date(data.startDate).toISOString().split('T')[0];
    const endDateString = new Date(data.endDate).toISOString().split('T')[0];

    startDateControl?.setValue(startDateString);
    endDateControl?.setValue(endDateString);
    
    this.form.get('isClosed')?.enable();
    this.form.get('isPublic')?.enable();
  }

  remove(data: any): void {
    this._updateService.startTimer();
    this._httpService.deleteById('event', data.id, { responseType: 'text' })
      .subscribe({
        next: () => { this._updateService.notify('Evento excluído com sucesso.', true); },
        error: (error: any) => {
          this._updateService.notify('Erro ao excluir evento.', true);
          console.error(error);
        }
      });
  }

  currentStatus(item:any){
    const dateNow = new Date();
    let startDate = new Date(item.startDate);
    startDate.setUTCHours(0, 0, 0, 0);
    let endDate = new Date(item.endDate);
    endDate.setUTCHours(23, 59, 59, 999);

    if (item.isClosed) {
      return 'Finalizado';
    } else if (dateNow < startDate) {
      return 'A realizar';
    } else if (dateNow >= startDate && dateNow <= endDate) {
      return 'Em andamento';
    } else {
      return 'Finalizado';
    }
  }
}
