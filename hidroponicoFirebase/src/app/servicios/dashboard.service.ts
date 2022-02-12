import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { ESP32 } from '../modelos/ESP32';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    public dbHidro$: Promise<AngularFireList<ESP32>> | any;
    constructor(private afd: AngularFireDatabase) {
        this.getDb();   
    }

    public getDb(): void{
        this.dbHidro$ = this.afd.list('ESP32');
    }
    public getAllDataHidroponic(): AngularFireList<ESP32> {
        return this.dbHidro$;
    }
}
