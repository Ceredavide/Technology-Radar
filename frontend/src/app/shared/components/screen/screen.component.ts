import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './screen.component.html'
})
export class ScreenComponent {

}
