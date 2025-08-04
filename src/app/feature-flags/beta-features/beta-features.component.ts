import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagsService } from '../../services/feature-flags.service';

@Component({
  selector: 'app-beta-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="beta-container">
      <h2>Beta Features Dashboard</h2>
      
      <!-- Complex feature flag usage with parent-child relationship -->
      @if (featureFlagsService.isFeatureEnabled('enableBetaFeatures')) {
        <div class="beta-features">
          @if (featureFlagsService.isBetaFeatureEnabled('enableAdvancedSearch')) {
            <div class="feature-card">
              <h3>Advanced Search</h3>
              <p>Use our new powerful search capabilities</p>
              <button class="beta-btn">Try Advanced Search</button>
            </div>
          }

          @if (featureFlagsService.isBetaFeatureEnabled('enableCustomThemes')) {
            <div class="feature-card">
              <h3>Custom Themes</h3>
              <p>Personalize your experience with custom themes</p>
              <button class="beta-btn">Customize Theme</button>
            </div>
          }
        </div>
      } @else {
        <p>Beta features are currently disabled.</p>
      }
    </div>
  `,
  styles: [`
    .beta-container {
      padding: 1rem;
      border: 1px solid #ccc;
      margin-bottom: 1rem;
    }
    .beta-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }
    .feature-card {
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      background: #f8f9fa;
    }
    .beta-btn {
      background: #4a90e2;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class BetaFeaturesComponent {
  constructor(public featureFlagsService: FeatureFlagsService) {}
}
