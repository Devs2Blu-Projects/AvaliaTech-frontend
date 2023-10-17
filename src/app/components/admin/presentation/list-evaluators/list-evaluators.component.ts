import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../../../../shared/services/http/http.service';
import { UpdateService } from '../../../../shared/services/update/update.service';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-list-evaluators',
  templateUrl: './list-evaluators.component.html',
  styleUrls: ['./list-evaluators.component.scss']
})
export class ListEvaluatorsComponent {
  data: any[] = [];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, @Inject(MAT_DIALOG_DATA) private _data: any) {
    this.data = _data;
   }

   @ViewChild(ToastComponent) toast!: ToastComponent;

   deleteRating(id: number){
    this._httpService.deleteById(`rating/evaluator`, id, {responseType: 'text'})
      .subscribe({
        next: () => {
          this.data = this.data.filter((rating) => rating.id !== id);
          this._updateService.notify('Avaliador removido com sucesso!');
        },
        error: (error: any) => {
          this._updateService.notify('Erro ao carregar apresentações.');
          console.error(error);
        }
      });
   }
}
