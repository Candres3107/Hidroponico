import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public formLoginUser = new FormGroup({
        user: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    })

    constructor(private authService: AuthService) {

    }

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
    public login() {
        let user: string = this.formLoginUser.get('user')?.value;
        let password: string = this.formLoginUser.get('password')?.value;
        this.authService.login(user, password).then(res => {
            console.log('Se ha logueado correctamente el usuario: ', res);

        }).catch(error => {
            console.log(error);
        })
    }

    public reset(): void{
        this.formLoginUser.reset();
    }

}
