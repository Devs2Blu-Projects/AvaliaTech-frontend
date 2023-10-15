import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  public update: EventEmitter<string> = new EventEmitter<string>();
  startTime: number = 0;
  elapsedTime?: number;
  notification: string = '';

  notify(notification: string, stopTimer?: boolean): void {
    this.notification = notification;

    if (stopTimer) this.stopTimer();
    else this.elapsedTime = undefined;

    this.update.emit(notification);
  }

  startTimer(): void { this.startTime = parseInt(performance.now().toFixed(0)); }
  stopTimer(): void { this.elapsedTime = parseInt(performance.now().toFixed(0)) - this.startTime; }

  getElapsedTime(): number | undefined { return this.elapsedTime; }
  getNotification(): string { return this.notification; }
}
