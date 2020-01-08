import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BankService } from '../bank.service';

@Component({
  selector: 'app-make-deposit',
  templateUrl: './make-deposit.component.html',
  styleUrls: ['./make-deposit.component.css']
})
export class MakeDepositComponent implements OnInit {
  public deposit: FormGroup;
  public accountTypes: string[] = ['savings','current','fixed deposit','domiciliary '];
  public message;
  public total;


  get dispError(){
    return this.deposit.get('amount');
  }
  constructor(private fb: FormBuilder, private bank: BankService) { }

 
  ngOnInit() {
    this.deposit = this.fb.group({
      account: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('[0-9]{3,5}')]]
    })
  }
onDeposit(){
  console.log(this.deposit.value);
  this.bank.deposit(this.deposit.value)
    .subscribe(data => {
      console.log(data);
      if(data.success){
        this.message = data.message;
        this.total = data.total;
      }
    })
}
}
