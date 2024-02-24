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
  @Input() alertType: alertType = null
  @Input() message: string = '';
}

type alertType =  'info' | 'warning' | 'error' | 'success' | null