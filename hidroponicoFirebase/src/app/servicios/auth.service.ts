import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { getDatabase, ref, set } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angauth:AngularFireAuth) { }

  async login(email:string, password:string){
    try {
      return await this.angauth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("Usuario o contraseña incorrecto", err);
      return null;
    }
  }

  async registrar(email:string, password:string){
    try {
      return await this.angauth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log( "No fue posible registrar usuario",err);
      return null;
    }
  }

  obtenerUsuarioLog(){
    return this.angauth.authState;
  }

  logout(){
    this.angauth.signOut();
  }

}
