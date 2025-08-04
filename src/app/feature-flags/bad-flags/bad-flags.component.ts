import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagsService } from '../../services/feature-flags.service';

@Component({
  selector: 'app-bad-flags',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bad-practice-container">
      <h2>UI Settings (Bad Practice Example)</h2>
      
      <!-- Bad practice: Multiple overlapping flags -->
      <div class="ui-section">
        @if (featureFlagsService.isFeatureEnabled('enableLegacyMode')) {
          <!-- Bad: This could conflict with modern UI -->
          <div class="legacy-ui">
            <h3>Legacy Interface</h3>
            <div class="old-controls">
              <button class="legacy-btn">Old Button Style</button>
            </div>
          </div>
        }

        @if (featureFlagsService.isFeatureEnabled('enableModernUI')) {
          <!-- Bad: This conflicts with legacy mode -->
          <div class="modern-ui">
            <h3>Modern Interface</h3>
            <div class="new-controls">
              <button class="modern-btn">New Button Style</button>
            </div>
          </div>
        }

        @if (featureFlagsService.isFeatureEnabled('enableExperimentalFeatures')) {
          <!-- Bad: This might override both legacy and modern UI -->
          <div class="experimental-ui">
            <h3>Experimental Interface</h3>
            <div class="exp-controls">
              <button class="exp-btn">Experimental Button</button>
            </div>
          </div>
        }

        <div class="warning">
          <p>⚠️ Bad Practice Alert:</p>
          <ul>
            <li>Multiple conflicting UI modes enabled simultaneously</li>
            <li>Overlapping feature flags causing inconsistent UI</li>
            <li>No clear hierarchy or fallback strategy</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bad-practice-container {
      padding: 1rem;
      border: 1px solid #ff4444;
      margin-bottom: 1rem;
      background: #fff5f5;
    }
    .ui-section {
      margin-top: 1rem;
    }
    .warning {
      margin-top: 1rem;
      padding: 1rem;
      background: #ffe0e0;
      border-left: 4px solid #ff4444;
    }
    .legacy-btn {
      background: #gray;
      border: 2px solid #666;
    }
    .modern-btn {
      background: #4a90e2;
      border: none;
      border-radius: 4px;
    }
    .exp-btn {
      background: linear-gradient(45deg, #ff4444, #ff8c00);
      border: none;
      border-radius: 20px;
    }
  `]
})
export class BadFlagsComponent {
  constructor(public featureFlagsService: FeatureFlagsService) {}
}
