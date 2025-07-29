import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { FilmesComponent } from './paginas/filmes/filmes.component';
import { FotosComponent } from './paginas/fotos/fotos.component';
import { PostaisComponent } from './paginas/postais/postais.component';
import { EventosComponent } from './paginas/eventos/eventos.component';
import { DesejosComponent } from './layout/desejos/desejos.component';
import { UbuntuComponent } from './paginas/ubuntu/ubuntu.component';
import { TesteComponent } from './paginas/teste/teste.component';
import { AdminComponent } from './paginas/admin/admin.component';
import { AlbumCriarComponent } from './layout/album-criar/album-criar.component';
import { MulherComponent } from './paginas/mulher/mulher.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'filmes', component: FilmesComponent },
    { path: 'fotos', component: FotosComponent },
    { path: 'postais', component: PostaisComponent },
    { path: 'eventos', component: EventosComponent },
    { path: 'desejos', component: DesejosComponent },
    { path: 'ubuntu', component: UbuntuComponent },
    { path: 'teste', component: TesteComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'album-criar', component: AlbumCriarComponent },
    { path: 'mulher', component: MulherComponent },



];
