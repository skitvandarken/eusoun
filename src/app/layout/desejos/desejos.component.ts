import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-desejos',
  imports: [
    MenuComponent,
    FormsModule,
  ],
  templateUrl: './desejos.component.html',
  styleUrls: ['./desejos.component.css']
})

export class DesejosComponent {
  }
  
