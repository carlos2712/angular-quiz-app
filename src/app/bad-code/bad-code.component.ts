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


  poorlyWrittenFunction() {
    let result = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.answers[i] === this.questions[i].correctAnswer) {
        result++;
      }
    }
    return "Your score is " + result + " out of " + this.questions.length;
  }

}
