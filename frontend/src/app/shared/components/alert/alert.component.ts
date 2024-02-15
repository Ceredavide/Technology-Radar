import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './alert.component.html'
})

export class AlertComponent {
  @Input() alertType: 'info' | 'warning' | 'error' | 'success' = 'info';
  @Input() message: string = '';
}
