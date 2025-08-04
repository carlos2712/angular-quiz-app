import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz/quiz.component';
import { LotteryComponent } from './lottery/lottery.component';
import { SimpleHeaderComponent } from './feature-flags/simple-header/simple-header.component';
import { BetaFeaturesComponent } from './feature-flags/beta-features/beta-features.component';
import { BadFlagsComponent } from './feature-flags/bad-flags/bad-flags.component';
import { TrunkBasedComponent } from './feature-flags/trunk-based/trunk-based.component';
import { RedesignComponent } from './feature-flags/redesign/redesign.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    FormsModule, 
    CommonModule,
    QuizComponent, 
    LotteryComponent,
    SimpleHeaderComponent,
    BetaFeaturesComponent,
    BadFlagsComponent,
    TrunkBasedComponent,
    RedesignComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-quiz-app';
  activeTab: 'quiz' | 'lottery' | 'feature-flags' = 'quiz';
}
