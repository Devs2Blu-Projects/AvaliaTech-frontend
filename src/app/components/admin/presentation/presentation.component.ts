import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPresentationComponent } from './dialog-presentation/dialog-presentation.component';
import { HttpService } from '../../../shared/services/http/http.service';
import { UpdateService } from '../../../shared/services/update/update.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { ListEvaluatorsComponent } from './list-evaluators/list-evaluators.component';
import { EventModel, GroupDTO, GroupsByDateDTO, RatingGetDTO } from '../../../shared/interfaces';
import { Subscription } from 'rxjs';

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
export class PresentationComponent implements OnInit, OnDestroy {
  data: day[] = [];
  updateRef!: Subscription;
  notifications: string[] = ['Erro ao carregar apresentações.', 'Erro ao salvar ordem.'];
  expandedItemId: number | null = null;
  orderNumbers: number = 1;
  event: EventModel | null = null;

  filter = '';
  filterCols = ['language', 'projectName'];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getAll();
    this.updateRef = this._updateService.update
      .subscribe({
        next: (response: string) => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();

          if (this.notifications.every(notification => notification !== response)) this.getAll();
        }
      });
    this.getActiveEvent();
  }

  ngOnDestroy(): void { this.updateRef.unsubscribe(); }

  getAll(): void {
    this._httpService.getAll('group/groupsByDate', { responseType: 'json'})
      .subscribe({
        next: (response: any) => {
          this.data = response;
          this.data.forEach((day: day) => {
            day.groups.forEach((group) => {
              this.getGroupAvaliations(group as GroupDTO & { ratings: RatingGetDTO[] });
            });
          });
        },
        error: (error: any) => {
          this._updateService.notify(this.notifications[0]);
          this.toast.showToast();
          console.error(error);
        }
      });
  }

  getGroupAvaliations(group: GroupDTO & {ratings: RatingGetDTO[]}): void {
    this._httpService.getById('rating/group', group.id, { responseType: 'json'})
      .subscribe({
        next: (response: any) => {
          group.ratings = response;
        },
        error: (error: any) => {
          this._updateService.notify(this.notifications[0]);
          this.toast.showToast();
          console.error(error);
        }
      })
  }

  getActiveEvent(){
    this._httpService.getAll('global/currentEvent')
      .subscribe({
        next: (response: any) => { this.event = response },
        error: (error: any) => {
          this._updateService.notify('Erro ao carregar apresentações.');
          this.toast.showToast();
          console.error(error);
        }
      })
  }

  saveOrder(): void {
    this._updateService.startTimer();
    this._httpService.put('group/updateOrder', this.data, { responseType: 'text' })
      .subscribe({
        next: () => { this._updateService.notify('Ordem salva com sucesso.', true); },
        error: (error: any) => {
          this._updateService.notify(this.notifications[1]);
          console.error(error);
        }
      });
  }

  openDialog(data: any = null): void { this._dialog.open(DialogPresentationComponent, { data }); }
  openDialogEvaluators(data: GroupDTO & { ratings: RatingGetDTO[] }): void { this._dialog.open(ListEvaluatorsComponent, { data }); }

  drop(event: CdkDragDrop<day>) {
    if (event.previousContainer === event.container) moveItemInArray(event.container.data.groups, event.previousIndex, event.currentIndex);
    else transferArrayItem(event.previousContainer.data.groups, event.container.data.groups, event.previousIndex, event.currentIndex);
  }
}
