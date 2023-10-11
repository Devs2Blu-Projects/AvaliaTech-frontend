import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPresentationComponent } from './dialog-presentation/dialog-presentation.component';
import { HttpService } from '../../../shared/services/http/http.service';
import { UpdateService } from '../../../shared/services/update/update.service';
declare var bootstrap: any;

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  
  data: any = [];
  elapsedTime: number = 0;
  notification: string = '';
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
          this.getAll();
          this.notification = this._updateService.getNotification();
        }, error: (error: any) => { console.error(error); }
      });
  }

  getAll(): void {
    this._updateService.startTimer();
    this._httpService.getAll('group')
      .subscribe({
        next: (response: any) => {
          this.data = response;
          this.elapsedTime = this._updateService.stopTimer();
        }, error: (error: any) => { console.error(error); }
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
