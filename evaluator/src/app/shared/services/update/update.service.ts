import * as bootstrap from 'bootstrap';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  public update: EventEmitter<string> = new EventEmitter<string>();
  startTime: number = 0;
  notification: string = '';

  notify(notification: string): void {
    this.notification = notification;
    this.update.emit(notification);
  }

  startTimer(): void { this.startTime = performance.now(); }
  stopTimer(): number {
    const endTime = performance.now();

    return endTime - this.startTime;
  }

  getNotification(): string { return this.notification; }

  showToast(): void {
    const toast : HTMLElement | null = document.querySelector('#toast');

    if (!toast) throw new Error('Element toast is null.');
    else {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);

      try {
        toastBootstrap.show();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
