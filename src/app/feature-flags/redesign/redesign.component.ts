import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagsService } from '../../services/feature-flags.service';
import { ModernDashboardComponent } from './modern-dashboard/modern-dashboard.component';
import { LegacyDashboardComponent } from './legacy-dashboard/legacy-dashboard.component';

@Component({
  selector: 'app-redesign',
  standalone: true,
  imports: [CommonModule, ModernDashboardComponent, LegacyDashboardComponent],
  template: `
    <div class="redesign-container">
      <h2>UI Redesign (Best Practice Example)</h2>
      
      <!-- Good practice: Single source of truth with clear feature flag -->
      <div class="ui-section" [class.redesigned]="isRedesignEnabled">
        @if (isRedesignEnabled) {
          <app-modern-dashboard />
        } @else {
          <app-legacy-dashboard />
        }

        <div class="best-practices">
          <p>✅ Good Practice Highlights:</p>
          <ul>
            <li>Single feature flag for the entire redesign</li>
            <li>Clear separation between old and new designs</li>
            <li>Consistent data representation across both versions</li>
            <li>Gradual rollout capability with A/B testing</li>
            <li>No overlapping UI states or conflicts</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .redesign-container {
      padding: 1.5rem;
      border: 1px solid #4CAF50;
      margin-bottom: 1.5rem;
      background: #f8f9fa;
    }

    .ui-section {
      padding: 1rem;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .ui-section.redesigned {
      background: #ffffff;
    }

    .best-practices {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #e8f5e9;
      border-left: 4px solid #4CAF50;
    }

    .best-practices ul {
      margin: 0.5rem 0 0 0;
      padding-left: 1.5rem;
    }

    .best-practices li {
      margin: 0.5rem 0;
      color: #2e7d32;
    }
  `]
})
export class RedesignComponent implements OnInit {
  isRedesignEnabled = true;

  constructor(private featureFlagsService: FeatureFlagsService) {}

  ngOnInit() {
    // Using the modernDashboard feature flag to control the redesign
    this.isRedesignEnabled = this.featureFlagsService.isFeatureEnabled('modernDashboard');
  }
}
