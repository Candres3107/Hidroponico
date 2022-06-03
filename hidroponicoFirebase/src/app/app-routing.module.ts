import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { LoginComponent } from './componentes/login/login.component';
import { ServiciosGuard } from './servicios.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //loadChildren: () => import('./componentes/dashboard/dashboard.component').then(m => m.DashboardComponent),
    //canActivate: [ServiciosGuard],
    //data: { authGuardPipe: redirectUnauthorizedToLogin }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
function redirectUnauthorizedTo(this: any, arg0: string[]) {
  this.router.navigate(['']);
  this.authService.logout();
}

