import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatNativeDateModule} from '@angular/material';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CheckBalanceComponent } from './check-balance/check-balance.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { MakeDepositComponent } from './make-deposit/make-deposit.component';
import { OpenNewAccountComponent } from './open-new-account/open-new-account.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    IndexComponent,
    DashboardComponent,
    LogoutComponent,
    AccountDetailsComponent,
    PageNotFoundComponent,
    CheckBalanceComponent,
    TransferMoneyComponent,
    MakeDepositComponent,
    OpenNewAccountComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    MatRippleModule,
    MatExpansionModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatNativeDateModule,
    MatTableModule
    // MDBBootstrapModule.forRoot()
  ],
  schemas : [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
