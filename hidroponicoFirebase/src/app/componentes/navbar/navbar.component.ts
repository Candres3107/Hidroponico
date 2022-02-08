import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
UserLogged=this.authService.obtenerUsuarioLog();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
