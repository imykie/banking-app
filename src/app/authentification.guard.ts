import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BankService } from './bank.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {

  constructor(private bank: BankService,
              private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.bank.isLoggedIn){
        return true;
      }

    return this.bank.loggedIn().pipe(map(res => { 
      if(res.status){
        this.bank.setLoggedIn(true);
        return true;
      }else{
        this.router.navigate(['login']);
        return false;
      }
    }))
  }
}
