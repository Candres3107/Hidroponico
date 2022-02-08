import { Component, OnInit } from '@angular/core';
//import { DashboardService } from './servicios/dashboard.service';
import { AngularFireModule } from '@angular/fire/compat';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
Humedad:Observable<any[]>;

  constructor(private firestore: AngularFireModule) { }

  ngOnInit(): void {
  }

}
