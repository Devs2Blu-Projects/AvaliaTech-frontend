import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPresentationComponent } from './dialog-presentation/dialog-presentation.component';
import { HttpService } from '../../../shared/services/http/http.service';
import { UpdateService } from '../../../shared/services/update/update.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { ListEvaluatorsComponent } from './list-evaluators/list-evaluators.component';
import { GroupDTO, GroupsByDateDTO, RatingGetDTO } from '../../../shared/interfaces';

type day = GroupsByDateDTO & {
  groups: {
    ratings: RatingGetDTO[];
  }[]
};

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  data: day[] = [];
  expandedItemId: number | null = null;
  orderNumbers: number = 1;

  filter = '';
  filterCols = ['language', 'projectName'];

  items: any[] = [
    { id: 1, equipe: 'Equipe A', stack: 'Stack A' },
    { id: 2, equipe: 'Equipe B', stack: 'Stack B' },
    { id: 3, equipe: 'Equipe C', stack: 'Stack C' },
  ];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getAll();
    this._updateService.update
      .subscribe({
        next: () => {
          this.getAll()
          this.toast.notification = this._updateService.getNotification();
        }
      });
  }

  getAll(): void {
    this._httpService.getAll('group/groupsByDate')
      .subscribe({
        next: (response: any) => { 
          this.data = response; 
          this.data.forEach((day: day) => {
            day.groups.forEach((group) => {
              this.getGroupAvaliations(group as GroupDTO & {ratings: RatingGetDTO[]});
            });
          });
        },
        error: (error: any) => {
          this._updateService.notify('Erro ao carregar apresentações.');
          this.toast.showToast();
          console.error(error);
        }
      });
  }

  getGroupAvaliations(group: GroupDTO & {ratings: RatingGetDTO[]}): void {
    this._httpService.getById('rating/group', group.id)
      .subscribe({
        next: (response: any) => {
          group.ratings = response;
        },
        error: (error: any) => {
          this._updateService.notify('Erro ao carregar apresentações.');
          this.toast.showToast();
          console.error(error);
        }
      })
  }

  saveOrder(): void {
    this._httpService.put('group/updateOrder', this.data, { responseType: 'text' })
      .subscribe({
        next: (response: any) => {
          this._updateService.notify('Ordem salva com sucesso.');
          this.toast.showToast();
        },
        error: (error: any) => {
          this._updateService.notify('Erro ao salvar ordem.');
          this.toast.showToast();
          console.error(error);
        }
      });
  }

  openDialog(data: any = null): void { this._dialog.open(DialogPresentationComponent, { data: data }); }
  openDialogEvaluators(data: GroupDTO & {ratings: RatingGetDTO[]}): void { this._dialog.open(ListEvaluatorsComponent, { data }); }

  drop(event: CdkDragDrop<day>) {
    if (event.previousContainer === event.container)
      moveItemInArray(event.container.data.groups, event.previousIndex, event.currentIndex);
    else transferArrayItem(event.previousContainer.data.groups, event.container.data.groups, event.previousIndex, event.currentIndex);
  }
}
