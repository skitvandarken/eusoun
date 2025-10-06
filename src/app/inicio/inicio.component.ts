import { Component } from '@angular/core';
import { MenuComponent } from '../layout/menu/menu.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-inicio',
  imports: [
    MenuComponent,
    RouterLink
],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
