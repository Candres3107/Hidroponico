import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServiciosGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  router: any;
  constructor(private route:Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            return true;
          } else if (!user) {
            console.log('User is not logged in');
            this.router.navigate(['/'],{queryParams:{returnUrl:state.url}});
          return false;
          } else{
            console.log("guard 25");
return false;
          }
        });
      });
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
