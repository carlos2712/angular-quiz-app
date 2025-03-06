import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bad-code',
  templateUrl: './bad-code.component.html',
  styleUrls: ['./bad-code.component.css']
})
export class BadCodeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  calculateSum(a, b) {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum;
  }

  calculateMultipleSums() {
    let result1 = this.calculateSum(1, 2);
    let result2 = this.calculateSum(3, 4);
    let result3 = this.calculateSum(5, 6);
    console.log(result1, result2, result3);
  }

}
