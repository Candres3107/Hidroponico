import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './servicios/auth.service';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public title = 'hidroponicoFirebase';

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        //this.sesionActive();
    }

    myimage: string = 'assets/images/login.jpeg';

}


