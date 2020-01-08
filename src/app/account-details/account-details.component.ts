import { Component, OnInit } from '@angular/core';
import{ BankService } from '../bank.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { formValidations, MustMatch } from '../shared/form-validation';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
public accReg: FormGroup;
public accountTypes: string[] = ['savings','current','fixed deposit','domiciliary '];
public message;

get verifyAcc(){
  return this.accReg.get('account');
 }
get deposit(){
  return this.accReg.get('amount');
}
  constructor(private fb: FormBuilder, private bank: BankService, private router: Router) { }

  ngOnInit() {
    this.accReg = this.fb.group({
      account: ['', Validators.required],
      amount: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(5)]]
    })
  }
  onSubmit(){
    this.bank.accountDetails(this.accReg.value)
      .subscribe(data =>{ console.log(data)
        if(data.success){
          this.bank.fetchId(this.accReg.value)
           .subscribe(data => {console.log(data)
            if(data.success){
              this.bank.creditAccount(this.accReg.value)
            .subscribe(data => {console.log(data)
            if(data.success){
              this.router.navigate(['/login']);
              this.message = data.message;
              alert(data.message);
              alert(data.account);
            }
            })
            }});
        }
      });
      
  }
}
