import { Injectable } from '@angular/core';
import { Pipe } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { ESP32 } from '../modelos/ESP32';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

  private refresh$= new Subject<void>();
    public dbHidro$: Promise<AngularFireList<ESP32>> | any;
    //public encenderBomba: ESP32={};
    constructor(private afd: AngularFireDatabase) {
        this.getDb();

        //this.getDHT();
    }

    get Refresh$(){
      return this.refresh$;
    }

    //Crea un nuevo gato


    public getDb(): void{
        this.dbHidro$ = this.afd.list('ESP32');
    }

    public getAllDataHidroponic(): AngularFireList<ESP32> {
        return this.dbHidro$;
    }



    public sendBomba(data:any){
      console.log("32 Servicio",data.Bomba);
      this.afd.list("ESP32").update('Bomba',{'estado':data.Bomba}).then(data=>{console.log(data);
      });

    }


}
function x(x: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}

function Refresh$() {
  throw new Error('Function not implemented.');
}

