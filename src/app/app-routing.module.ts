import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthentificationGuard } from './authentification.guard';
import { LogoutComponent } from './logout/logout.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CheckBalanceComponent } from './check-balance/check-balance.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { OpenNewAccountComponent } from './open-new-account/open-new-account.component';
import { MakeDepositComponent } from './make-deposit/make-deposit.component';


const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent },
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'accountRegistration', component: AccountDetailsComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthentificationGuard]},
  {path: 'dashboard/:dir', component: TransactionsComponent, canActivate: [AuthentificationGuard], 
  children: [
    // {path: '', redirectTo: '/checkBalance', pathMatch: 'full'},
    {path: 'checkBalance', component: CheckBalanceComponent },
    {path: 'transfer', component: TransferMoneyComponent },
    {path: 'open-account', component: OpenNewAccountComponent },
    {path: 'deposit', component: MakeDepositComponent }
    // {path: '**', component: PageNotFoundComponent}
  ]  
},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
