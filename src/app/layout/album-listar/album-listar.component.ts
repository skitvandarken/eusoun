import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe, NgIf, NgFor } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.models';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../menu/menu.component';

// Declare UIkit as a global variable
declare var UIkit: any;

@Component({
  selector: 'app-album-listar',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    NgIf,
    NgFor,
    AsyncPipe,
    MenuComponent
  ],
  templateUrl: './album-listar.component.html',
  styleUrls: ['./album-listar.component.css']
})
export class AlbumListarComponent implements OnInit {

  activeModalIndex: number | null = null;

openModal(index: number) {
  this.activeModalIndex = index;
  // Manually show the modal (since we're toggling visibility)
  UIkit.modal(`#modal-${index}`).show();
}
  albums: Album[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.getAlbuns().subscribe(data => {
      this.albums = data;
    });
  }
}
