import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faBootstrap } from '@fortawesome/free-brands-svg-icons';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public noUser:number=0;
  public formLoginUser = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //this.sesionActive();
  }
  // public sesionActive(){
  //     this.authService.loggedUser().then(res => {
  //         console.log('Usuario logueado', res)
  //     }).catch(error => {
  //         console.error(error);
  //     });
  // }
  public login(): any {
    let user: string = this.formLoginUser.get('user')?.value;
    let password: string = this.formLoginUser.get('password')?.value;
    this.authService
      .login(user, password)
      .then((res: any) => {
        if (res == 1) {
          console.log('componente 39', res);
          this.notification();
        } else {
          if (res==1){
            //showModal();
          }
          console.log('Se ha logueado correctamente el usuario: ', res);
          return
        }
      })
      .catch((error) => {
        console.log('39 servicio', error);
        this.notification();
      });
  }

  async notification() {
    Swal.fire({
      icon: 'warning',
      title: '¡Error al iniciar sesión!',
      text: 'Usuario o contraseña incorrecta, por favor verifiquelos',
      timer: 2500,
      timerProgressBar: true,
      focusConfirm: true
    });
  }

  public reset(): void {
    this.formLoginUser.reset();
  }
}
