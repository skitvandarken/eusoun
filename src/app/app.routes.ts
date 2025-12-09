import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { FilmesComponent } from './paginas/filmes/filmes.component';
import { FotosComponent } from './paginas/fotos/fotos.component';
import { EventosComponent } from './paginas/eventos/eventos.component';
import { DesejosComponent } from './layout/desejos/desejos.component';
import { UbuntuComponent } from './paginas/ubuntu/ubuntu.component';
import { TesteComponent } from './paginas/teste/teste.component';
import { MulherComponent } from './paginas/mulher/mulher.component';
import { FotosSemanadaeticaComponent } from './layout/fotos-semanadaetica/fotos-semanadaetica.component';
import { Mesa1Component } from './paginas/mesa-1/mesa-1.component';
import { ContribuicaoComponent } from './paginas/contribuicao/contribuicao.component';
import { TablesComponent } from './paginas/tables/tables.component';
import { ContribuitionsComponent } from './paginas/contribuitions/contribuitions.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'filmes', component: FilmesComponent },
  { path: 'fotos', component: FotosComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'desejos', component: DesejosComponent },
  { path: 'ubuntu', component: UbuntuComponent },
  { path: 'teste', component: TesteComponent },
  { path: 'mulher', component: MulherComponent },
  { path: 'semana-da-etica', component: FotosSemanadaeticaComponent },
  { path: 'mesas', component: Mesa1Component },
  { path: 'contribuicoes', component: ContribuicaoComponent },
  { path: 'tables', component: TablesComponent},
  { path: 'contributions', component: ContribuitionsComponent }
];
