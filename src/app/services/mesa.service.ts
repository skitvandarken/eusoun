import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp, query, where, getDocs, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private firestore: Firestore) {}

  // ✅ Enviar respostas da Mesa 1
enviarMesa(dados: any) {

  const mesaRef = collection(this.firestore, 'mesas');

  return addDoc(mesaRef, {
    ...dados,
    createdAt: serverTimestamp()
  });

}

// ✅ Buscar TODAS as mesas (uma vez)
async getTodasMesas() {

  const mesaRef = collection(this.firestore, 'mesas');
  const querySnapshot = await getDocs(mesaRef);

  const resultados: any[] = [];

  querySnapshot.forEach((doc) => {
    resultados.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return resultados;

}


  /*-------------------------------------------------------
   ✅ 2. BUSCAR DADOS EM TEMPO REAL (realtime)
  -------------------------------------------------------*/
  listenTodasMesas(callback: (data: any[]) => void) {

  const mesaRef = collection(this.firestore, 'mesas');

  return onSnapshot(mesaRef, (snapshot) => {

    const resultados: any[] = [];

    snapshot.forEach((doc) => {
      resultados.push({
        id: doc.id,
        ...doc.data()
      });
    });

    callback(resultados);

  });
}

}
