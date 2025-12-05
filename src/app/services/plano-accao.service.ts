import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanoAccaoService {

  constructor(private firestore: Firestore) {}

  // ENVIAR PLANO
  enviarPlano(payload: any) {
    const ref = collection(this.firestore, 'planosAcao');
    return addDoc(ref, payload);
  }

  // OUVIR PLANOS EM TEMPO REAL
  listenPlanos(): Observable<any[]> {
    return new Observable((observer) => {
      const ref = collection(this.firestore, 'planosAcao');

      const unsub = onSnapshot(ref, (snap) => {
        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        observer.next(data);
      });

      return () => unsub();
    });
  }
}
