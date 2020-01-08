import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BankService } from '../bank.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {
  public transfer: FormGroup;
  public sendMoney: FormGroup;  
  public accountTypes: string[] = ['savings','current','fixed deposit','domiciliary'];
  public verified: boolean = false;
  public surname: string;
  public midname: string;
  public lastname: string;
  public proceed: boolean;
  public message: string;
  public isInvalid: boolean = false;
  public transfered: string;
  public deducted: string;



  get acctNum(){
    return this.transfer.get('acctNumber');
  }
  get amount(){
    return this.sendMoney.get('money');
  }
  constructor(private fb: FormBuilder, private bank: BankService, private router: Router) { }

  ngOnInit() {
    this.transfer = this.fb.group({
      account: ['', Validators.required],
      acctNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      // acctType: ['Please Select an Account', Validators.required]
    });

    this.sendMoney = this.fb.group({
      money: ['', [Validators.required, Validators.pattern('[0-9]{4,5}')]]
    })
  }
  onSubmit(){
    console.log(this.transfer.value);
    this.bank.verifyAccount(this.transfer.value)
      .subscribe(data =>{
        this.verified = false;
        this.isInvalid = false;
        console.log(data);
        if(data.success){
          this.verified = true;
          this.surname = data.surname;
          this.midname = data.midname;
          this.lastname = data.lastname;
        }else{
          this.isInvalid = true;
          this.message = "Invalid Account Number";
        }
      })
  }

 check(){
   this.proceed = true;
 }

 send(){
   let info = {
    account: this.transfer.get('account').value,
    account_number: this.transfer.get('acctNumber').value,
    money : this.sendMoney.get('money').value
   }
   this.bank.checkBalance(info)
    .subscribe(data => {
      console.log(data);
      if(data.success){
        this.bank.transfer(info)
          .subscribe(data =>{
            if(data.success){
              this.transfered = data.message;
              this.deducted = data.messageRep;
            }else{
              this.transfered = data.message;
            }
            
        })
      }
    })
   
 }
 openInput(){
  console.log(this.transfer.controls);
  const invalid =[];
  const controls = this.transfer.controls;
  for(const name in controls){
    if(controls[name].invalid){
      invalid.push(name);
      console.log(invalid);
    }
  }
}
}
