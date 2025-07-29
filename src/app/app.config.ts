import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({


    eventCoalescing: true
  }), provideRouter(routes),
  provideClientHydration(withEventReplay()),


  provideFirebaseApp(() => initializeApp({
    apiKey: "AIzaSyArKbJ0D4Ra0YaSJMfqbXZZ5Q_072yCmmA",
    authDomain: "eusounos-9420c.firebaseapp.com",
    databaseURL: "https://eusounos-9420c-default-rtdb.firebaseio.com",
    projectId: "eusounos-9420c",
    storageBucket: "eusounos-9420c.firebasestorage.app",
    messagingSenderId: "330509433905",
    appId: "1:330509433905:web:18d3e26a69493b62be2910",
    measurementId: "G-GPTFRSSX3T"
  })),
  provideFirestore(() => getFirestore())

  ]




}



