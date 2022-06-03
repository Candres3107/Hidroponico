import { Attribute, Component, OnInit } from '@angular/core';
//import { AngularFireModule } from '@angular/fire/compat';
import { DashboardService } from 'src/app/servicios/dashboard.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ESP32 } from 'src/app/modelos/ESP32';
import { objNivel } from 'src/app/modelos/ESP32';
import { Chart, registerables } from 'node_modules/chart.js';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public dataHidro: Array<ESP32> | any = [];
  public dataUserName: any = {};
  public nameOrEmail: string;
  public infoData: Array<ESP32> | any = [];
  public DHT11: Array<ESP32> | any = [];
  public Temp: Array<ESP32> | any = [];
  public Tanque: Array<ESP32> | any = [];
  public Niveles: Array<ESP32> | any = [];
  public TemperaturaN: Array<ESP32> | any = [];
  public TemperaturaA: Array<ESP32> | any = [];
  public TemperaturaNS: Array<ESP32> | any = [];
  public Phpromedio: Array<ESP32> | any = [];
  public Nivel: Array<ESP32> | any = [];
  public TempNiv: Array<ESP32> | any = [];
  public TempNiv2: Array<ESP32> | any = [];
  public humedadG: Array<ESP32> | any = [];
  public bomba: Object = {
    bomba: null,
  };
  public TemperaturaNivel: Array<objNivel> = [];
  public estadoBomba: number = 0;
  public estadoBombaLabel:string='';
  public iconTarjeta:string='';

  constructor(
    private dashService: DashboardService,
    private authService: AuthService
  ) {
    Chart.register(...registerables);
    this.nameOrEmail = '';
  }

  ngOnInit(): void {
    this.getInfoHidroponico();
    if(this.estadoBomba==1){
      this.estadoBombaLabel="Apagar Bomba";
    } else{
      this.estadoBombaLabel="Encender Bomba";
    }
  }



  public getInfoHidroponico() {
    this.TemperaturaNivel= [];
    this.infoData=[];
    this.Temp=[];
    this.Tanque=[];
    this.Niveles=[];
    this.TemperaturaA=[];
    this.TemperaturaN=[];
    this.Phpromedio=[];
    this.dashService
      .getAllDataHidroponic()
      .snapshotChanges()
      .pipe(
        map((changes) => {
          changes.map((action) => {
            this.dataHidro.push({
              id: action.payload.key,
              valor: action.payload.val(),
            });
          });
        })
      )
      .subscribe(() => {
        this.getNameUser();

        this.dataHidro.filter((x: any) => {
          console.log('56', x);
          if (
            x.id !== 'Humedad' &&
            x.id !== 'Temperatura' &&
            x.id !== 'Tanque' &&
            x.id !== 'Niveles' &&
            x.id !== 'TemperaturaN' &&
            x.id !== 'HumedadN' &&
            x.id !== 'HumedadT' &&
            x.id !== 'Ph promedio' &&
            x.id !== 'TemperaturaA' &&
            x.id !== 'TemperaturaNS' &&
            x.id !== 'HumedadProm' &&
            x.id !== 'Bomba'
          ) {
            this.infoData.push(x);
            if (x.id === 'Bomba') {
              console.log('83',x);
              switch (x.id){
                case 'Nivel Tanque':
                this.iconTarjeta='<i class="fa-thin fa-water"></i>';
                break;
                case 'Ph':
                this.iconTarjeta='<i class="fa-thin fa-eye-dropper"></i>';
                break;
                case 'Temperatura Actual':
                this.iconTarjeta='<i class="fa-thin fa-temperature-three-quarters"></i>';
                break;
                default:
                  this.iconTarjeta= '<i class="fa-thin fa-arrows-rotate"></i>';

              }

              this.estadoBomba = x.valor.estado;
            }
            console.log('Servicio 77', this.infoData);
            console.log('Servicio 78', this.estadoBomba);
          } else if (x.id === 'Temperatura') {
            console.log('61', x.valor);
            for (let info in x.valor) {
              this.Temp.push({ fecha: info, valor: x.valor[info] });
            }
            console.log('67', this.Temp);
          } else if (x.id === 'Tanque') {
            console.log('69', x.valor);
            //this.DHT11.push(x.valor);

            for (let info in x.valor) {
              this.Tanque.push({ fecha: info, valor: x.valor[info] });
            }
            console.log('75', this.Tanque);
          } else if (x.id === 'Niveles') {
            console.log('77', x.valor);

            for (let info in x.valor) {
              this.Niveles.push({ Nivel: info, valor: x.valor[info] });
            }
            console.log('Servicio 82', this.Niveles);
          } else if (x.id === 'TemperaturaN') {
            console.log('Servicio 85', x.valor);
            //this.DHT11.push(x.valor);

            for (let info in x.valor) {
              this.TemperaturaN.push({
                Nivel: info,
                Temperatura: x.valor[info],
              });
            }
            console.log('91', this.TemperaturaN);
          }  else if (x.id === 'Humedad') {
            console.log('93', x.valor);
            //this.DHT11.push(x.valor);
            console.log('95', this.DHT11);
            for (let info in x.valor) {
              this.DHT11.push({ fecha: info, valor: x.valor[info] });
            }
          } else if (x.id === 'HumedadT') {
            console.log('114', x.id);
            this.humedadG.push(x);
            let humedad = this.humedadG[0];
            this.getGauge(humedad);
            console.log('119', this.humedadG);

            console.log('120', this.humedadG);
          } else if (x.id === 'TemperaturaA') {
            console.log('Servicio 164', x.valor);
            //this.DHT11.push(x.valor);

            for (let info in x.valor) {
              this.TemperaturaA.push({
                Semana: info,
                Temperatura: x.valor[info],
              });
            }
            console.log('173', this.TemperaturaA);
          } else if (x.id === 'TemperaturaNS') {
            console.log('Servicio 175', x.valor);
            //this.DHT11.push(x.valor);

            for (let info in x.valor) {
              this.TemperaturaNS.push({
                Semana: info,
                Temperatura: x.valor[info],
              });
            }
            console.log('184', this.TemperaturaNS);
          }else if (x.id === 'Ph promedio') {
            console.log('69', x.valor);
            //this.DHT11.push(x.valor);

            for (let info in x.valor) {
              this.Phpromedio.push({ Semana: info, valor: x.valor[info] });
            }
            console.log('75', this.Phpromedio);
          } else {
            this.Nivel.push(Object.assign({}, this.Niveles, this.TemperaturaN));
            console.log('104', this.Nivel);
          }
        });
        // Envio a las gráficas
        console.log('66', this.DHT11);
        this.getDataOnChart(this.Tanque);
        this.getDataOnLine(this.Temp, this.DHT11);
        this.getDataOnLine2(this.TemperaturaNS, this.TemperaturaA);
        this.getDataOnChart2(this.Phpromedio);
        //this.getGauge(this.humedadG);

        this.Niveles.forEach((e: any, index: number) => {
          let seccion: objNivel = {
            nivel: '',
            temperatura: 0,
            valor: '',
          };
          console.log('127', this.Niveles);
          console.log('128', index);
          seccion.nivel = e.Nivel;
          seccion.temperatura = this.TemperaturaN[index].Temperatura;
          seccion.valor = e.valor;
          console.log('133', seccion);
          this.TemperaturaNivel.push(seccion);
        });
        console.log('136', this.TemperaturaNivel);
        console.log('119 ', this.TempNiv);
      });
  }

  public Bomba(estadoBomba: number) {
    console.log('Servicio 164',estadoBomba);

    if(estadoBomba==1){
      this.estadoBomba=0;
      this.bomba={
        Bomba:this.estadoBomba
      };
      console.log("171", this.bomba);

      this.dashService.sendBomba(this.bomba);
      this.estadoBombaLabel='Encender Bomba';

    } else {
      this.estadoBomba=1;
      this.bomba={
        Bomba:this.estadoBomba
      };
      console.log("182", this.bomba);

      this.dashService.sendBomba(this.bomba);
      this.estadoBombaLabel='Apagar Bomba';
    }
  }




  public getGauge(humedad: any): void {
    console.log('153', humedad);
    const ctx: any = document.getElementById('myGauge');
    ctx.getContext('2d');
    const myGauge = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Humedad (%)'],
        datasets: [
          {
            label: '% humedad',
            data: [humedad.valor, 100 - humedad.valor],
            backgroundColor: ['#FFF', '#2C94E0'],
            hoverOffset: 5,
            hoverBorderWidth: 2,
            hoverBorderColor: '#21B4F9',
          },
        ],
      },
      options: {
        rotation: 270, // start angle in degrees
        circumference: 180, // sweep angle in degrees
        cutout: 80,
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio:1,
        resizeDelay:50,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Humedad en el ambiente',
            color:'rgba(255,255,255,0.8)',
        },
      },

    }});

  }

  public getDataOnChart(Tanque: any): void {
    console.log('157', Tanque);
    const ctx: any = document.getElementById('myChart');
    ctx.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        //labels: [DHT11.fecha],
        datasets: [
          {
            label: '% del nivel del tanque',
            data: Tanque,
             backgroundColor: ['rgba(68, 82, 252, 0.5)'],
            borderColor: ['rgba(255, 255, 255, 1)'],
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels:{
              color: 'rgba(255, 255, 255,0.8)',
            }
          },
          title: {
            display: true,
            text: 'Historico de llenado de agua en el tanque (%) ',
            color: 'rgba(255, 255, 255,0.8)',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks:{
              color:"rgba(255,255,255,0.8)",},
          },
          xAxes:{
            ticks:{
              color:"rgba(255,255,255,0.8)",},
          }

        },
        parsing: { xAxisKey: 'fecha', yAxisKey: 'valor' },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  public getDataOnChart2(Ph: any): void {
    console.log('348', Ph);
    const ctx: any = document.getElementById('myChart2');
    ctx.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        //labels: [Ph.Semana],
        datasets: [
          {
            label: 'Ph promedio',
            data: Ph,
             backgroundColor: ['rgba(68, 82, 252, 0.5)'],
            borderColor: ['rgba(255, 255, 255, 1)'],
            borderWidth: 2,
            hoverBorderWidth: 0,
          },

        ],
      },
      options: {
        indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
        plugins: {
          legend: {
            position: 'bottom',
            labels:{
              color: 'rgba(255, 255, 255,0.8)',
            }
          },
          title: {
            display: true,
            text: 'Promedio pH durante la semana',
            color: 'rgba(255, 255, 255,0.8)',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks:{
              color:"rgba(255,255,255,0.8)",},
          },
          xAxes:{
            ticks:{
              color:"rgba(255,255,255,0.8)",},
              min: 0,
              max: 8,

          }

        },

        parsing: { xAxisKey: 'valor', yAxisKey: 'Semana' },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  public getDataOnLine(Temp: any, dh11: any) {
    const ctx2: any = document.getElementById('Linea');
    ctx2.getContext('2d');
    const myChart = new Chart(ctx2, {
      type: 'line',
      data: {
        //labels: [dh11.fecha],
        datasets: [
          {
            label: 'Temperatura (°c)',
            data: Temp,
            borderColor: 'rgba(243, 156, 18, 1)',
            backgroundColor: 'rgba(255,255,255,1)',
          },
          {
            label: 'Humedad (%)',
            data: dh11,
            borderColor: 'rgba(40, 116, 166, 1)',
            backgroundColor: 'rgba(255,255,255,1)',

          },
        ],
      },
      options: {
        parsing: { xAxisKey: 'fecha', yAxisKey: 'valor' },
        responsive: true,
        resizeDelay:15,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks:{
              color:"rgba(255,255,255,1)",},
          },
          xAxes:{
            ticks:{
              color:"rgba(255,255,255,1)",},
          }

        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {color:"rgba(255, 255, 255, 0.8)"}  ,


          },
          title: {
            display: true,
            text: 'Tendencia de temperatura vs humedad',
            color:"rgba(255, 255, 255, 0.8)",
          },
        },
      },
    });
    window.addEventListener('beforeprint', () => {
      myChart.resize(30, 30);
      myChart.update();
    });
    window.addEventListener('afterprint', () => {
      myChart.resize();
      myChart.update();
    });
  }



  public getDataOnLine2(TempS: any, TempA: any) {
    console.log("405 S",TempS);
    console.log("405 A",TempA);
    const ctx2: any = document.getElementById('Linea2');
    ctx2.getContext('2d');
    const myChart = new Chart(ctx2, {
      type: 'line',
      data: {
        //labels: [dh11.fecha],
        datasets: [
          {
            label: 'Temperatura Sistema (°C)',
            data: TempS,
            borderColor: 'rgba(243, 156, 18, 1)',
            backgroundColor: 'rgba(255,255,255,1)',
          },
          {
            label: 'Temperatura Ambiente (°C)',
            data: TempA,
            borderColor: 'rgba(40, 116, 166, 1)',
            backgroundColor: 'rgba(255,255,255,1)',

          },
        ],
      },
      options: {
        parsing: { xAxisKey: 'Semana', yAxisKey: 'Temperatura' },
        responsive: true,
        resizeDelay:15,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks:{
              color:"rgba(255,255,255,1)",},
          },
          xAxes:{
            ticks:{
              color:"rgba(255,255,255,1)",},
          }

        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {color:"rgba(255, 255, 255, 0.8)"}  ,


          },
          title: {
            display: true,
            text: 'Tendencia de temperatura ambiente vs Temperatura del sistema (°C)',
            color:"rgba(255, 255, 255, 0.8)",
          },
        },
      },
    });
    window.addEventListener('beforeprint', () => {
      myChart.resize(30, 30);
      myChart.update();
    });
    window.addEventListener('afterprint', () => {
      myChart.resize();
      myChart.update();
    });
  }

  public getNameUser() {
    this.dataUserName = this.authService.userEmail;
    if (this.dataUserName.displayName == null) {
      this.nameOrEmail = this.dataUserName.email;
    } else {
      this.nameOrEmail = this.dataUserName.displayName;
    }
  }

  public getBackground(titulonombre: String) {
    console.log(titulonombre);
    2;
    switch (titulonombre) {
      case 'Nivel Tanque':
        return '#57b4fc';
      case 'Ph':
        return '#7a65f2';
      case 'Temperatura Actual':
        return '#ff625b';
      default:
        return '#61d862';
    }
  }

  public getBackgroundColor(titulonombre: String) {
    console.log(titulonombre);
    2;
    switch (titulonombre) {
      case 'Ok':
        return '#2ECC71';
      case 'Error':
        return '#E74C3C';
      default:
        return '#F4D03F';
    }
  }


}
function x(
  arg0: (x: { Nivel: any }) => any,
  x: any,
  arg2: { Valor: any }
): any {
  throw new Error('Function not implemented.');
}
