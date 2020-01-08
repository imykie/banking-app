import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface loggedIn{
  status: boolean;
}
interface loggedOut{
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class BankService {
  public logInStatus = false;
   
  setLoggedIn(value:boolean){
    this.logInStatus = value;
  }

  get isLoggedIn(){
    return this.logInStatus;
  }

  constructor(private http: HttpClient) { }
  check(data){
    return this.http.post<any>("/bankdb/check.php",data)
  }
  checkUsername(data){
    return this.http.post<any>("/bankdb/checkUsername.php",data)
  }
  uploadPassport(data){
    return this.http.post<any>("/bankdb/passport.php",data);
  }
  signup(data){
    return this.http.post<any>("/bankdb/signup.php",data);
  }
  login(data){
    return this.http.post<any>("/bankdb/login.php",data);
  }
  loggedIn(): Observable<loggedIn>{
    return this.http.get<loggedIn>("/bankdb/session.php");
  }
  logout(): Observable<loggedOut>{
    return this.http.get<loggedOut>("/bankdb/logout.php");
  }
  accountDetails(data){
    return this.http.post<any>("/bankdb/accountDetails.php",data);
  }
  creditAccount(data){
    return this.http.post<any>("/bankdb/creditAccount.php",data);
  }
  fetchId(data){
    return this.http.post<any>("/bankdb/fetchAcct_id.php",data);
  }
  checkBalance(data){
    return this.http.post<any>("/bankdb/checkBalance.php", data);
  }
  deposit(data){
    return this.http.post<any>("/bankdb/deposit.php", data);
  }
  verifyAccount(data){
    return this.http.post<any>("/bankdb/checkAccount.php", data);
  }
  transfer(data){
    return this.http.post<any>("/bankdb/transfer.php", data);
  }
  statementOfAcc(){
    return this.http.get<any>("/bankdb/statement_of_account.php");
  }
}
