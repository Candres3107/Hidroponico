import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, set } from 'firebase/database';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userLoged: boolean | any;
  public userInformation: Array<any> | any = [];
  public userEmail: Array<any> | any = [];
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  public login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          this.userEmail = data.user;
          resolve(this.userEmail);
        })
        .catch((error) => {
          let dataError: any = {
            codigo: 1,
            mensaje:
              'Error al iniciar sesión; <strong>usuario</strong> y/o <strong>contraseña</strong> incorrecta.',
          };
          console.log('Servicio 32',error);
          //reject(dataError.codigo);
          reject(1);
        });
    })
      .then((data) => {
        console.log(this.userEmail);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.log(error);
        return(error);
      });
  }

  async loggedUser() {
    return await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userInformation = user;
          resolve(user);
        } else {
          let error = 'Error al autenticas';
          reject(error);
        }
      });
    })
      .then((user) => {
        console.log(user);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.log('Ningun usuario activo', error);
      });
  }

  async registrar(email: string, password: string) {
    // try {
    //   return await this.angauth.createUserWithEmailAndPassword(email, password);
    // } catch (err) {
    //   console.log( "No fue posible registrar usuario",err);
    //   return null;
    // }
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signOut()
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    })
      .then((res) => {
        this.userLoged = false;
        this.userInformation = [];
        console.log('Usuario cerró sesión ', res);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error al cerrar la sesión: ', error);
      });
  }

  public getUserInfo() {
    return this.userInformation;
  }

  public getSesionInfo() {
    return this.userLoged;
  }

  public userEmailName() {
    return this.userEmail;
  }
}
