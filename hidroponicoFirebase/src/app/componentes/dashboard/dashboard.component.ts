import { Component, OnInit } from '@angular/core';
//import { AngularFireModule } from '@angular/fire/compat';
import { DashboardService } from 'src/app/servicios/dashboard.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ESP32 } from 'src/app/modelos/ESP32';
import { Chart, registerables } from 'node_modules/chart.js';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public dataHidro: Array<ESP32> | any = [];
    public dataUserName: any = {};
    public nameOrEmail: string;
    constructor(private dashService: DashboardService, private authService: AuthService) { 
        Chart.register(...registerables);
        this.nameOrEmail = '';
    }

    ngOnInit(): void {
        this.getInfoHidroponico();
    }

    public getInfoHidroponico(){
        this.dashService.getAllDataHidroponic().snapshotChanges().pipe(
            map(changes => {
                changes.map(action => {
                    this.dataHidro.push({id: action.payload.key, valor: action.payload.val()})
                })
            })
        ).subscribe(() => {
            this.getNameUser();
            this.getDataOnChart(this.dataHidro[0], this.dataHidro[1], this.dataHidro[2]);
        });
    }

    public getDataOnChart(humedad:any, ph:any, nivelDeAgua:any): void {
        const ctx:any = document.getElementById('myChart');
        ctx.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Humedad', 'PH', 'Nivel de agua'],
                datasets: [{
                    label: 'Proyecto Hidroponico',
                    data: [humedad.valor, ph.valor, nivelDeAgua.valor],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    public getNameUser(){
        this.dataUserName = this.authService.userEmail;
        if(this.dataUserName.displayName == null){
            this.nameOrEmail = this.dataUserName.email;
        } else {
            this.nameOrEmail = this.dataUserName.displayName;
        }
    }

}
