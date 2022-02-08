import { Component } from '@angular/core';
//import { fa-user } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hidroponicoFirebase';

  usuario={
    email:'',
    password:''
  }

  constructor(private authService: AuthService){}

  Ingresar(){
    console.log(this.usuario);
    const{email,password}=this.usuario;
    this.authService.login(email,password).then(res =>{
      console.log("Usuario logeado exitosamente: ",res);
    })
  }

  obtenerUsuarioLog(){
    this.authService.obtenerUsuarioLog().subscribe(res=>{
    console.log(res?.email);
  });
  }

  Logout(){
    this.authService.logout();
    console.log("Su sesión ha sido cerrada satisfactoriamente");
  }

  myimage:string='assets/images/login.jpeg';

}


