import { Component } from '@angular/core';
import { MenuComponent } from '../layout/menu/menu.component';
import { FooterComponent } from '../layout/footer/footer.component';

@Component({
  selector: 'app-inicio',
  imports: [
    MenuComponent,FooterComponent
    
],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
