import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuComponent } from '../../layout/menu/menu.component';
import { CommonModule } from '@angular/common';
import { MesaService } from '../../services/mesa.service';

@Component({
  selector: 'app-contribuicao',
  imports: [
    MenuComponent,
    CommonModule,
  ],
  templateUrl: './contribuicao.component.html',
  styleUrl: './contribuicao.component.css'
})
export class ContribuicaoComponent implements OnInit, OnDestroy {

  mesas: any[] = [];
  loading = true;
  unsubscribe: any;

  constructor(
    private mesaService: MesaService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Só chamar Firestore se estivermos no browser
    if (isPlatformBrowser(this.platformId)) {
      this.unsubscribe = this.mesaService.listenTodasMesas((data) => {
        this.mesas = data;
        this.loading = false;
      });
    } else {
      // no server (prerender) apenas evita timeout e mostra placeholder
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    // Parar o listener se houver
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

}
