import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection, serverTimestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlbumListarComponent } from '../album-listar/album-listar.component';
@Component({
  selector: 'app-album-criar',
  imports: [FormsModule, CommonModule, AlbumListarComponent],
  templateUrl: './album-criar.component.html',
  styleUrl: './album-criar.component.css'
})
export class AlbumCriarComponent {


  // Data models
  albuns = [];
  eventoUrl: string = '';
  featuredImagerUrl = ''
  newAlbum = {
    title: '',
    albumImageUrl: [''],
  };

  albumItemsInput: string = '';
  get parsedAlbumItems(): string[] {
    return this.albumItemsInput
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0);
  }


  isSubmitting = false;
  errorMessage = '';



  private firestore = inject(Firestore);
  private router = inject(Router);

  async onSubmit() {
    this.errorMessage = '';

    if (!this.newAlbum.title.trim()) {
      this.errorMessage = 'O título é obrigatório.';
      return;
    }



    this.isSubmitting = true;

    try {
      const albunsCollection = collection(this.firestore, 'albuns');
      await addDoc(albunsCollection, {
        title: this.newAlbum.title,
        coverUrl: this.featuredImagerUrl || null, // 🔁 Use coverUrl instead of imageUrl
        images: this.parsedAlbumItems || [],      // ✅ Save the parsed album images
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Reset form
      this.newAlbum.title = '';
      this.featuredImagerUrl = '';
      this.router.navigate(['/']);



    } catch (error) {
      console.error('Erro ao salvar o album:', error);
      this.errorMessage = this.getFirestoreError(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  private getFirestoreError(error: any): string {
    if (error.code === 'permission-denied') {
      return 'Você não tem permissão para criar eventos.';
    }
    return 'Falha ao salvar. Tente novamente.';
  }

}
