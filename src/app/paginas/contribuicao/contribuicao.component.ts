import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private mesaService: MesaService) {}

  ngOnInit(): void {

    // Atualização em tempo real
    this.unsubscribe = this.mesaService.listenTodasMesas((data) => {
      this.mesas = data;
      this.loading = false;
    });

  }

  ngOnDestroy(): void {
    // Parar o listener
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

}
