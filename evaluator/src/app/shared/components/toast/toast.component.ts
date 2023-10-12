import * as bootstrap from 'bootstrap';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  elapsedTime: number = 0;
  notification: string = '';

  showToast(): void {
    const toast : HTMLElement | null = document.querySelector('#toast');

    if (toast) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);

      toastBootstrap.show();
    } else console.error('HTML element with property id="toast" is null here.');
  }
}
