import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../layout/menu/menu.component';
import { FormulariosComponent } from '../../layout/formularios/formularios.component';

@Component({
  selector: 'app-postais',
  standalone: true,
  imports: [
    MenuComponent,
    FormsModule,
    FormulariosComponent
    
  ],
  templateUrl: './postais.component.html',
  styleUrls: ['./postais.component.css']
})
export class PostaisComponent {
}