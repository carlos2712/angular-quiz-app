import { Injectable } from '@angular/core';

export interface LotteryQuestion {
  id: number;
  type: 'UX' | 'Development' | 'BA';
  question: string;
  answer: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  private questions: LotteryQuestion[] = [
    {
      id: 1,
      type: 'UX',
      question: 'What is the difference between UX and UI design?',
      answer: 'UX (User Experience) design focuses on the overall feel of the experience and how users interact with a product, while UI (User Interface) design focuses on the visual elements and layout of the interface.',
      image: 'assets/images/ux-vs-ui.png'
    },
    {
      id: 2,
      type: 'Development',
      question: 'What are forwardRef and circular dependencies in Angular, and how do you handle them?',
      answer: 'forwardRef is used to reference a type that\'s declared later in the code, solving circular dependency issues where two classes depend on each other. Example: Class A needs Class B in its constructor, but B also needs A. Use forwardRef(() => ClassB) in A\'s constructor to break the circular reference.'
    },
    {
      id: 3,
      type: 'BA',
      question: 'What is the purpose of a user story in Agile methodology?',
      answer: 'A user story is a simple description of a product feature written from the end user\'s perspective. It helps capture the who, what, and why of a requirement in a simple, concise way.'
    },
    {
      id: 4,
      type: 'UX',
      question: 'What is the importance of user research in UX design?',
      answer: 'User research helps understand user behaviors, needs, and motivations through observation and feedback. It ensures that design decisions are based on real user insights rather than assumptions.'
    },
    {
      id: 5,
      type: 'Development',
      question: 'Explain Angular\'s Change Detection ExpressionChangedAfterItHasBeenCheckedError and how to resolve it?',
      answer: 'This error occurs when a value changes after change detection has completed its check, often in ngAfterViewInit or ngAfterContentInit. To resolve it: 1) Use setTimeout to push the change to the next cycle, 2) Use ChangeDetectorRef.detectChanges() for immediate detection, or 3) Restructure the code to avoid the timing issue. Common causes include parent-child data flows and async operations.'
    },
    {
      id: 6,
      type: 'BA',
      question: 'What is the role of a Business Analyst in an Agile team?',
      answer: 'A Business Analyst in an Agile team helps bridge the gap between stakeholders and the development team, analyzes business needs, writes user stories, and ensures that requirements are clear and aligned with business objectives.'
    },
    {
      id: 7,
      type: 'UX',
      question: 'What is a user journey map and why is it important?',
      answer: 'A user journey map is a visual representation of the steps a user takes while interacting with a product. It helps identify pain points, opportunities for improvement, and ensures a seamless user experience across all touchpoints.'
    },
    {
      id: 8,
      type: 'UX',
      question: 'What is the difference between usability and accessibility?',
      answer: 'Usability focuses on how easy and efficient a product is to use, while accessibility ensures that people with disabilities can use the product effectively. Both are crucial for creating inclusive design.'
    },
    {
      id: 9,
      type: 'UX',
      question: 'What is the importance of information architecture in UX design?',
      answer: 'Information architecture organizes and structures content to help users find information and complete tasks efficiently. It creates a logical hierarchy and navigation system that matches users\' mental models.'
    },
    {
      id: 10,
      type: 'Development',
      question: 'What is lazy loading in Angular and why is it useful?',
      answer: 'Lazy loading is a technique where modules are loaded on demand rather than at initial load time. It improves application startup performance by reducing the initial bundle size and loading modules only when needed.'
    },
    {
      id: 11,
      type: 'Development',
      question: 'Explain the difference between promises and observables in Angular.',
      answer: 'Promises handle a single asynchronous event while observables handle multiple events over time. Observables are cancellable, support operators for data transformation, and can be used for both synchronous and asynchronous operations.'
    },
    {
      id: 12,
      type: 'Development',
      question: 'What are Angular guards and what are they used for?',
      answer: 'Guards are interfaces that control the accessibility of routes. They can prevent unauthorized access to certain routes, prevent users from leaving routes without saving changes, or load data before a route is activated.'
    },
    {
      id: 13,
      type: 'BA',
      question: 'What is the difference between functional and non-functional requirements?',
      answer: 'Functional requirements define what a system should do (specific behaviors and features), while non-functional requirements define how the system should perform (performance, security, reliability, etc.).'
    },
    {
      id: 14,
      type: 'BA',
      question: 'What is the purpose of a RACI matrix in project management?',
      answer: 'A RACI matrix defines roles and responsibilities by identifying who is Responsible, Accountable, Consulted, and Informed for each project task or deliverable. It helps prevent confusion and ensures clear accountability.'
    },
    {
      id: 15,
      type: 'UX',
      question: 'What are heuristic evaluations in UX design?',
      answer: 'Heuristic evaluations are expert reviews of a user interface based on established usability principles (heuristics). They help identify usability problems early in the design process without requiring user testing.'
    },
    {
      id: 16,
      type: 'Development',
      question: 'What is the purpose of NgZone in Angular?',
      answer: 'NgZone is a service that executes work inside or outside of the Angular zone. It helps manage change detection and improve performance by controlling when Angular should check for updates to the view.'
    },
    {
      id: 17,
      type: 'Development',
      question: 'Explain the concept of content projection in Angular.',
      answer: 'Content projection (ng-content) allows you to insert content from a parent component into a child component\'s template. It enables creating more flexible and reusable components.'
    },
    {
      id: 18,
      type: 'BA',
      question: 'What is the role of a BA in requirements elicitation?',
      answer: 'In requirements elicitation, a BA gathers requirements through interviews, workshops, document analysis, and observation. They ensure requirements are complete, clear, and align with business objectives.'
    },
    {
      id: 19,
      type: 'UX',
      question: 'What is the difference between low-fidelity and high-fidelity prototypes?',
      answer: 'Low-fidelity prototypes are basic representations focused on layout and flow, while high-fidelity prototypes are detailed designs that closely match the final product in terms of visuals and interactions.'
    },
    {
      id: 20,
      type: 'BA',
      question: 'What is the purpose of a business process model?',
      answer: 'A business process model visually represents the workflow of a business process. It helps identify inefficiencies, standardize procedures, and communicate process improvements to stakeholders.'
    },
    {
      id: 21,
      type: 'Development',
      question: 'What are Angular pipes and when should you use them?',
      answer: 'Pipes transform displayed values within a template. They\'re used for formatting data (like dates, numbers, or currency) and can be chained together. Custom pipes can be created for specific formatting needs.'
    },
    {
      id: 22,
      type: 'UX',
      question: 'What is the role of whitespace in UI design?',
      answer: 'Whitespace (negative space) improves readability, creates visual hierarchy, and reduces cognitive load. It helps guide users through content and creates a clean, professional appearance.'
    }
  ];

  private usedQuestions: Set<number> = new Set();

  constructor() { }

  getRandomQuestion(): LotteryQuestion | null {
    const availableQuestions = this.questions.filter(q => !this.usedQuestions.has(q.id));
    
    if (availableQuestions.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];
    this.usedQuestions.add(question.id);
    
    return question;
  }

  getQuestionsByType(type: 'UX' | 'Development' | 'BA'): LotteryQuestion[] {
    return this.questions.filter(q => q.type === type);
  }

  resetUsedQuestions(): void {
    this.usedQuestions.clear();
  }

  getAllQuestionsShuffled(): LotteryQuestion[] {
    return [...this.questions]
      .sort(() => Math.random() - 0.5);
  }

  getQuestionsCountByType(): { [key: string]: number } {
    return {
      UX: this.questions.filter(q => q.type === 'UX').length,
      Development: this.questions.filter(q => q.type === 'Development').length,
      BA: this.questions.filter(q => q.type === 'BA').length
    };
  }
}
