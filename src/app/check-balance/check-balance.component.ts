import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import{ BankService } from '../bank.service';

@Component({
  selector: 'app-check-balance',
  templateUrl: './check-balance.component.html',
  styleUrls: ['./check-balance.component.css']
})
export class CheckBalanceComponent implements OnInit {
  public accountTypes: string[] = ['savings','current','fixed deposit','domiciliary '];
  public balance;
  checkBal = new FormGroup({
    account: new FormControl('Please Select an Account')
  })
  constructor(private bank: BankService) { }

  ngOnInit() {
  }


  onSubmit(){
    console.log(this.checkBal.value);
    this.bank.checkBalance(this.checkBal.value)
      .subscribe(data => {
        console.log(data);
        if(data.balance){
          this.balance = data.balance;
        }else{
          this.balance = "You did not register the account you selected";
        }
      });
  }
}
