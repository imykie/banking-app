import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  constructor() { }

  ngOnInit() {
  }

}
