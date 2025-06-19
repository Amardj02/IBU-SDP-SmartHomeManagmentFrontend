import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  visible = false;

  show(message: string, type: 'success' | 'error' = 'success') {
    this.message = message;
    this.type = type;
    this.visible = true;

    setTimeout(() => this.visible = false, 3000);
  }
}
