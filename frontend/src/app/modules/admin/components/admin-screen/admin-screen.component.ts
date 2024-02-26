import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ScreenComponent } from '../../../../shared/components/screen/screen.component';


@Component({
  selector: 'app-admin-screen',
  standalone: true,
  imports: [
    RouterOutlet,
    ScreenComponent
  ],
  templateUrl: './admin-screen.component.html'
})
export class AdminScreenComponent {}
