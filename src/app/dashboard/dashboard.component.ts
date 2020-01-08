import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public transactions = [
    {name: 'Personal Banking', dir:'personalBanking'},
    {name: 'Private Banking', dir:'privateBanking'},
    {name: 'Business Banking', dir:'businessBanking'},  
  ];
  public selected;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let dir = params.get('dir');
      this.selected = dir;
    })
  }

  onSelect(tran){
    // this.router.navigate(['/dashboard', tran.dir]);
    this.router.navigate([tran.dir], {relativeTo: this.route});
  }

  isSelected(tran){
    return tran.dir === this.selected;
  }
}
