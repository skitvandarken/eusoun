import { Component } from '@angular/core';
import { MenuComponent } from '../../layout/menu/menu.component';

@Component({
  selector: 'app-ubuntu',
  standalone: true, // Use this if the component is standalone
  imports: [
    MenuComponent, // Import other standalone components here
  ],
  templateUrl: './ubuntu.component.html',
  styleUrls: ['./ubuntu.component.css'], // Corrected: should be 'styleUrls' (plural), not 'styleUrl'
})
export class UbuntuComponent { 



  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


}
