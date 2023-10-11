import * as bootstrap from 'bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPresentationComponent } from './dialog-presentation/dialog-presentation.component';
import { HttpService } from '../../../shared/services/http/http.service';
import { UpdateService } from '../../../shared/services/update/update.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  data: any = [];
  isIconVisible = true;
  expandedItemId: number | null = null

  filter = '';
  filterCols = ['id','name','username'];

  items: any[] = [
    { id: 1, equipe: 'Equipe A', stack: 'Stack A' },
    { id: 2, equipe: 'Equipe B', stack: 'Stack B' },
    { id: 3, equipe: 'Equipe C', stack: 'Stack C' },
  ];
  avaliadores = [
    { id: 1, name: 'Raphael', isIconVisible: true },
    { id: 2, name: 'Rob', isIconVisible: true },
    { id: 3, name: 'Helena Luz', isIconVisible: true },
    { id: 4, name: 'Maria Claudia', isIconVisible: true },
  ];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngAfterViewInit() {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }
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
    this._httpService.getAll('group')
      .subscribe({
        next: (response: any) => { this.data = response; },
        error: (error: any) => {
          this._updateService.notify('Erro ao carregar apresentações.');
          this.toast.showToast();
          console.error(error);
        }
      });
  }

  openDialog(): void { this._dialog.open(DialogPresentationComponent); }

  closePopover(aval: any) {
    aval.isIconVisible = true;
  }
  confirmDelete(aval:any) {
    // Implemente a lógica de exclusão aqui
  }
}
