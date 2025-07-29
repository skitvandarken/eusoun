import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Album, AlbumCreateDTO } from '../models/album.models';
import { CollectionReference, DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albunsCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.albunsCollection = collection(this.firestore, 'albuns');
  }

  getAlbuns(): Observable<Album[]> { 
    return collectionData(this.albunsCollection, { idField: 'id' }) as Observable<Album[]>;
  }

  async createAlbum(data: AlbumCreateDTO) {
    const album = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    try {
      const docRef = await addDoc(this.albunsCollection, album);
      console.log('Album created with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating album:', error);
      throw error;
    }
  }
}
