import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import {} from  '..componentes/dashboard'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private dbPath='/hytools-1ef35-default-rtdb';

  constructor(private firestore: AngularFirestore) {

   }
   public getHumedad(documentId: string) {
    return this.firestore.collection('Humedad').doc(documentId).snapshotChanges();
  }
}
