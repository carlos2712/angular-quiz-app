import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagsService } from '../../services/feature-flags.service';

@Component({
  selector: 'app-simple-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="header-container">
      <!-- Simple feature flag usage -->
      @if (isNewHeaderEnabled) {
        <header class="new-header">
          <h1>New Modern Header ✨</h1>
          <nav>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        </header>
      } @else {
        <header class="old-header">
          <h1>Classic Header</h1>
          <nav>
            <a href="#">Home</a>
            <a href="#">About</a>
          </nav>
        </header>
      }
    </div>
  `,
  styles: [`
    .header-container {
      padding: 1rem;
      border: 1px solid #ccc;
      margin-bottom: 1rem;
    }
    .new-header {
      background: linear-gradient(to right, #4a90e2, #67b26f);
      color: white;
      padding: 1rem;
    }
    .old-header {
      background: #f0f0f0;
      padding: 1rem;
    }
  `]
})
export class SimpleHeaderComponent {
  isNewHeaderEnabled: boolean;

  constructor(private featureFlagsService: FeatureFlagsService) {
    this.isNewHeaderEnabled = this.featureFlagsService.isFeatureEnabled('enableNewHeader');
  }
}
