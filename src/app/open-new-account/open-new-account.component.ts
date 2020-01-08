import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';

@Component({
  selector: 'app-open-new-account',
  templateUrl: './open-new-account.component.html',
  styleUrls: ['./open-new-account.component.css']
})
export class OpenNewAccountComponent implements OnInit {
public displayedColumns: string[] = ['credit','debit'];
public isClicked = false;
public transactions;
  constructor(private bank: BankService) { }

  ngOnInit() {
  }
check(){
  this.bank.statementOfAcc()
    .subscribe(data =>{
      console.log(data);
      this.transactions = data;
      this.isClicked = true;
    })
}
getTotalCredit(){
  return this.transactions.map(t => t.credit).reduce(this.add);
  // console.log(this.transactions.map(t => t.credit))
}

getTotalDebit(){
  return this.transactions.map(t => t.debit).reduce(this.add);
}

add(total,value,i,arr){
  return parseInt(total)+parseInt(value);
}
}
