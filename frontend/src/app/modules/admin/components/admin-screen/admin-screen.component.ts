import { Component } from '@angular/core';
import { ScreenComponent } from '../../../../shared/components/screen/screen.component';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-screen',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ScreenComponent,
    AlertComponent
  ],
  templateUrl: './admin-screen.component.html'
})
export class AdminScreenComponent {}
