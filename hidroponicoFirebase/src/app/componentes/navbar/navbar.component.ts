import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isUserLogged$: Observable<any> = of(this.authService.getSesionInfo());
    public user$: Observable<any> = of(this.authService.getUserInfo());
    @Input () user: string | any;
    @Input () visible: string | any;
    @Input () visiblehamburguer: string | any;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.mostrarDatosDeUsuario();
        this.mostrarBotonDeSesion();
    }

    public Logout() {
        this.authService.logout();
    }

    public mostrarDatosDeUsuario(){
        this.user$.subscribe(data => {
            return data;
        })
    }

    public mostrarBotonDeSesion(){
        this.isUserLogged$.subscribe(data => {
            return data;
        })
    }


}
