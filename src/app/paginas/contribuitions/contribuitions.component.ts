import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../layout/menu/menu.component';
import { MesaService } from '../../services/mesa.service';
import { SelecoesService } from '../../services/selecoes.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { PlanoAccaoService } from '../../services/plano-accao.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-contribuitions',
  imports: [MenuComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './contribuitions.component.html',
  styleUrl: './contribuitions.component.css'
})
export class ContribuitionsComponent implements OnInit, OnDestroy {

  mesas: any[] = [];
  loading = true;
  unsubscribe: any;

  selectedAcoes: {
    mesaId: any;
    mesaNumero: any;
    categoria: string;
    acao: string;
  }[] = [];

  planosAcaoInputs: { [categoria: string]: string } = {
    Motivar: '',
    Crescer: '',
    Inovar: '',
  };

  planosSubmetidos: any[] = [];
  loadingPlanos = true;

  constructor(
    private mesaService: MesaService,
    private selecoesService: SelecoesService,
    private firestore: Firestore,
    @Inject(PLATFORM_ID) private platformId: Object,
    private planoAccaoService: PlanoAccaoService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      // Mesas
      this.unsubscribe = this.mesaService.listenTodasMesas((data) => {
        this.mesas = data;
        this.loading = false;
      });

      // Planos submetidos
      this.planoAccaoService.listenPlanos().subscribe((planos: any[]) => {
        this.planosSubmetidos = planos;
        this.loadingPlanos = false;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe();
  }

  // ================== CHECKBOX ==================
  isSelected(mesa: any, categoria: string, acao: string): boolean {
    return this.selectedAcoes.some(
      (s) =>
        s.mesaNumero === (mesa.numeroMesa || mesa.mesa) &&
        s.categoria === categoria &&
        s.acao === acao
    );
  }

  getAcoesArray(mesa: any, categoria: string): string[] {
    const cat = mesa[categoria.toLowerCase()];
    if (!cat) return [];
    return [cat.acao1, cat.acao2, cat.acao3].filter((a) => !!a);
  }

  toggleAcao(mesa: any, categoria: string, acao: string) {
    const mesaKey = mesa.numeroMesa || mesa.mesa;

    const index = this.selectedAcoes.findIndex(
      s =>
        s.mesaNumero === mesaKey &&
        s.categoria === categoria &&
        s.acao === acao
    );

    if (index > -1) {
      this.selectedAcoes.splice(index, 1);
    } else {
      this.selectedAcoes.push({
        mesaId: mesaKey,
        mesaNumero: mesaKey,
        categoria,
        acao,
      });
    }
  }

  // ================== FIREBASE ==================
  async enviarParaFirebase() {

  const payload = {
    dataEnvio: new Date(),
    acoes: ['Motivar', 'Crescer', 'Inovar'].map(cat => ({
      categoria: cat,
      planosAcao: this.planosAcaoInputs[cat] || '',
      acoesSelecionadas: this.selectedAcoes
        .filter(a => a.categoria === cat)
        .map(a => a.acao)
    }))
  };

  try {
    const planosRef = collection(this.firestore, 'planosAcao');
    await addDoc(planosRef, payload);

    alert('Plano de Ação enviado com sucesso!');

    // limpa inputs
    this.planosAcaoInputs = { Motivar: '', Crescer: '', Inovar: '' };
    this.selectedAcoes = [];

  } catch (err) {
    console.error('Erro ao enviar plano de ação', err);
    alert('Erro ao enviar plano de ação.');
  }
}
getAcoesByCategoria(categoria: string) {
  return this.selectedAcoes.filter(a => a.categoria === categoria);
}

}
