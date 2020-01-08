import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
public selected;
  constructor(private route: ActivatedRoute, private router: Router, private loc: Location) { }

  ngOnInit() {
    // let dir = this.route.snapshot.paramMap.get('dir');
    // this.selected = dir;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let dir = params.get('dir');
      this.selected = dir;
    })
  }

  goBack(){
    // this.loc.back();
    let selectedDir = this.selected ? this.selected : null;
    // this.router.navigate(['/dashboard', {dir: selectedDir}]);
    this.router.navigate(['../', {dir: selectedDir}], {relativeTo: this.route})
  }

  displayCheckBalance(){
    this.router.navigate(['checkBalance'], {relativeTo: this.route});
  }
  displayTransfer(){
    this.router.navigate(['transfer'], {relativeTo: this.route});
  }
  displayNewAccount(){
    this.router.navigate(['open-account'], {relativeTo: this.route});
  }
  displayDeposit(){
    this.router.navigate(['deposit'], {relativeTo: this.route});
  }
  statementOfAcc(){
    this.router.navigate(['open-account'], {relativeTo:this.route});
  }
}
