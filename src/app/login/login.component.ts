import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username;
  public password;
  public message = '';
  constructor(private _bankService: BankService, private router: Router) { }

  ngOnInit() {
  }

  loginHandler(){
    this._bankService.login({
      username: this.username,
      password: this.password})
      .subscribe(data=>{
        console.log(data);
        this.message = data.message;
        if(data.success){
          this._bankService.setLoggedIn(true);
          this.router.navigate(['dashboard']);
        }
        else{
          this._bankService.setLoggedIn(false);
        }
      });
  }
}
