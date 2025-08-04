import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Question {
  question: string;
  codeExample?: string;
  options: string[];
  correctAnswer: number;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  questions: Question[] = [
    {
      question: "What does the following Angular component do?",
      codeExample: `
        import { Component } from '@angular/core';

        @Component({
          selector: 'app-hello',
          template: '<h1>Hello World</h1>',
        })
        export class HelloComponent {}
      `,
      options: [
        "It defines a service.",
        "It defines a component that displays 'Hello World'.",
        "It defines a directive.",
        "It creates a model."
      ],
      correctAnswer: 1
    },
    {
      question: "What is the correct syntax to define a route in Angular?",
      codeExample: `
        import { NgModule } from '@angular/core';
        import { RouterModule, Routes } from '@angular/router';
        import { HomeComponent } from './home/home.component';

        const routes: Routes = [
          { path: '', component: HomeComponent },
        ];

        @NgModule({
          imports: [RouterModule.forRoot(routes)],
          exports: [RouterModule]
        })
        export class AppRoutingModule {}
      `,
      options: [
        "RouterModule.forRoot() is used to set up routing in Angular.",
        "We use the RouterModule.forChild() method to set up routes.",
        "Routes are defined using the Angular component's 'routes' property.",
        "We use AppRoutingModule to manage the application's data model."
      ],
      correctAnswer: 0
    },
    {
      question: "How can you pass data from a parent component to a child component in Angular?",
      codeExample: `
        @Component({
          selector: 'app-parent',
          template: '<app-child [childData]="parentData"></app.child>'
        })
        export class ParentComponent {
          parentData = 'Data from Parent';
        }

        @Component({
          selector: 'app-child',
          template: '<p>{{ childData }}</p>'
        })
        export class ChildComponent {
          @Input() childData: string;
        }
      `,
      options: [
        "By using a service to share data between components.",
        "By using the @Output() decorator to pass data back to the parent.",
        "By using the @Input() decorator to pass data to the child.",
        "By using the ngModel directive for two-way binding."
      ],
      correctAnswer: 2
    },
    {
      question: "What is the purpose of ngOnInit in an Angular component lifecycle?",
      codeExample: `
        import { Component, OnInit } from '@angular/core';

        @Component({
          selector: 'app-my-component',
          template: '<p>{{ message }}</p>'
        })
        export class MyComponent implements OnInit {
          message: string;

          ngOnInit() {
            this.message = 'Component Initialized!';
          }
        }
      `,
      options: [
        "It is called before the component is initialized.",
        "It is used for handling user input.",
        "It is called after the component is initialized and is a good place for initialization logic.",
        "It is used for handling HTTP requests."
      ],
      correctAnswer: 2
    },
    {
      question: "What is an Angular service, and how do you inject it into a component?",
      codeExample: `
        import { Injectable } from '@angular/core';

        @Injectable({
          providedIn: 'root'
        })
        export class MyService {
          getData() {
            return 'Service data';
          }
        }

        @Component({
          selector: 'app-my-component',
          template: '<p>{{ data }}</p>'
        })
        export class MyComponent {
          data: string;

          constructor(private myService: MyService) {
            this.data = this.myService.getData();
          }
        }
      `,
      options: [
        "An Angular service is a utility class that provides reusable logic. It can be injected via the constructor of a component.",
        "An Angular service is a special type of component.",
        "Services cannot be injected into components; they are used exclusively for routing.",
        "Services are injected using the @Input() decorator."
      ],
      correctAnswer: 0
    },
    {
      question: "What is Angular CLI?",
      options: [
        "A command line interface for Angular.",
        "A library for Angular.",
        "A component in Angular.",
        "A service in Angular."
      ],
      correctAnswer: 0
    },
    {
      question: "What is the purpose of Angular Router?",
      options: [
        "To handle HTTP requests.",
        "To manage application state.",
        "To navigate between different views or pages.",
        "To define custom directives."
      ],
      correctAnswer: 2
    },
    {
      question: "What is a decorator in Angular?",
      options: [
        "A function that adds metadata to a class, method, or property.",
        "A service in Angular.",
        "A component in Angular.",
        "A module in Angular."
      ],
      correctAnswer: 0
    },
    {
      question: "What is the purpose of Angular FormsModule?",
      options: [
        "To handle form validation.",
        "To create reactive forms.",
        "To create template-driven forms.",
        "All of the above."
      ],
      correctAnswer: 3
    },
    {
      question: "What is Angular Ivy?",
      options: [
        "A new component in Angular.",
        "A new service in Angular.",
        "A new rendering engine in Angular.",
        "A new module in Angular."
      ],
      correctAnswer: 2
    },
    {
      question: "What is the purpose of Angular HttpClient?",
      options: [
        "To handle HTTP requests.",
        "To manage application state.",
        "To navigate between different views or pages.",
        "To define custom directives."
      ],
      correctAnswer: 0
    },
    {
      question: "What is Angular Universal?",
      options: [
        "A library for server-side rendering.",
        "A component in Angular.",
        "A service in Angular.",
        "A module in Angular."
      ],
      correctAnswer: 0
    },
    {
      question: "What is the purpose of Angular NgModule?",
      options: [
        "To define a module in Angular.",
        "To define a component in Angular.",
        "To define a service in Angular.",
        "To define a directive in Angular."
      ],
      correctAnswer: 0
    },
    {
      question: "What is Angular Change Detection?",
      options: [
        "A mechanism to detect changes in the application state.",
        "A service in Angular.",
        "A component in Angular.",
        "A module in Angular."
      ],
      correctAnswer: 0
    },
    {
      question: "What is Angular Dependency Injection?",
      options: [
        "A design pattern to manage dependencies.",
        "A service in Angular.",
        "A component in Angular.",
        "A module in Angular."
      ],
      correctAnswer: 0
    },
    {
      question: "What is the output of the following code?",
      codeExample: `
        console.log(typeof null);
      `,
      options: [
        "object",
        "null",
        "undefined",
        "number"
      ],
      correctAnswer: 0
    },
    {
      question: "What is the purpose of the 'use strict' directive in JavaScript?",
      options: [
        "To enable strict mode which catches common coding mistakes and 'unsafe' actions.",
        "To disable strict mode.",
        "To enable debugging mode.",
        "To enable asynchronous mode."
      ],
      correctAnswer: 0
    },
    {
      question: "What is the output of the following code?",
      codeExample: `
        let a = [1, 2, 3];
        let b = a;
        b.push(4);
        console.log(a);
      `,
      options: [
        "[1, 2, 3]",
        "[1, 2, 3, 4]",
        "[4, 1, 2, 3]",
        "[1, 2, 3, 4, 4]"
      ],
      correctAnswer: 1
    },
    {
      question: "What is the difference between '==' and '===' in JavaScript?",
      options: [
        "'==' checks for equality of value, while '===' checks for equality of value and type.",
        "'==' checks for equality of value and type, while '===' checks for equality of value.",
        "There is no difference.",
        "'==' is used for comparison, while '===' is used for assignment."
      ],
      correctAnswer: 0
    },
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A function having access to its own scope, the scope of the outer function, and the global scope.",
        "A function having access to only its own scope.",
        "A function having access to only the global scope.",
        "A function having access to only the scope of the outer function."
      ],
      correctAnswer: 0
    }
  ];

  correctCount = 0;
  selectedAnswer: number | null = null;
  currentStep = 0;
  isQuizComplete = false;

  nextQuestion() {
    if (this.selectedAnswer === this.questions[this.currentStep].correctAnswer) {
      this.correctCount++;
    }
    
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.selectedAnswer = null;
    } else {
      this.isQuizComplete = true;
    }
  }

  getResult(): string {
    return `You got ${this.correctCount} out of ${this.questions.length} questions correct!`;
  }

  restartQuiz() {
    this.currentStep = 0;
    this.selectedAnswer = null;
    this.correctCount = 0;
    this.isQuizComplete = false;
  }
}
