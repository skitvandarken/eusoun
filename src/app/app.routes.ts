import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { FilmesComponent } from './paginas/filmes/filmes.component';
import { FotosComponent } from './paginas/fotos/fotos.component';
import { EventosComponent } from './paginas/eventos/eventos.component';
import { DesejosComponent } from './layout/desejos/desejos.component';
import { UbuntuComponent } from './paginas/ubuntu/ubuntu.component';
import { TesteComponent } from './paginas/teste/teste.component';
import { MulherComponent } from './paginas/mulher/mulher.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'filmes', component: FilmesComponent },
    { path: 'fotos', component: FotosComponent },
    { path: 'eventos', component: EventosComponent },
    { path: 'desejos', component: DesejosComponent },
    { path: 'ubuntu', component: UbuntuComponent },
    { path: 'teste', component: TesteComponent },
    { path: 'mulher', component: MulherComponent },



];
