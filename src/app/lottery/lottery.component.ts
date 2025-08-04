import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LotteryService, LotteryQuestion } from '../services/lottery.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-lottery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'rotateY(0)'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('0.6s ease-in-out')
      ]),
      transition('flipped => default', [
        animate('0.6s ease-in-out')
      ])
    ])
  ]
})
export class LotteryComponent implements OnInit {
  currentQuestion: LotteryQuestion | null = null;
  isAnswerVisible = false;
  questions: LotteryQuestion[] = [];
  selectedQuestionIds: Set<number> = new Set();
  
  constructor(private lotteryService: LotteryService) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questions = this.lotteryService.getAllQuestionsShuffled();
  }

  selectQuestion(question: LotteryQuestion) {
    if (this.selectedQuestionIds.has(question.id)) {
      return; // Don't allow selecting already picked questions
    }
    this.currentQuestion = question;
    this.isAnswerVisible = false;
    this.selectedQuestionIds.add(question.id);
  }

  toggleAnswer() {
    this.isAnswerVisible = !this.isAnswerVisible;
  }

  closeQuestion() {
    this.currentQuestion = null;
    this.isAnswerVisible = false;
  }

  reshuffleQuestions() {
    this.loadQuestions();
    this.selectedQuestionIds.clear(); // Reset selected questions when reshuffling
  }

  getQuestionTypeClass(type: string): string {
    switch (type) {
      case 'UX':
        return 'ux-card';
      case 'Development':
        return 'dev-card';
      case 'BA':
        return 'ba-card';
      default:
        return '';
    }
  }
}
