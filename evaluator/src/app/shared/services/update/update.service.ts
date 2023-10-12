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
}
