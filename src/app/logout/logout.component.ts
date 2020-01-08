import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private bank: BankService,
              private router: Router) { }

  ngOnInit() {
    this.bank.logout().subscribe(data => {
      if(data.success){
        this.router.navigate(['index']);
        this.bank.setLoggedIn(false);
      }else{
        alert('Errors');
      }
    })
  }

}
