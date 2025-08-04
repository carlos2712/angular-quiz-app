import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagsService, Environment, RolloutStrategy } from '../../services/feature-flags.service';

@Component({
  selector: 'app-trunk-based',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="trunk-based-container">
      <h2>Trunk-Based Development Demo</h2>
      
      <div class="environment-selector">
        <h3>Current Environment</h3>
        <div class="button-group">
          <button 
            *ngFor="let env of environments"
            [class.active]="currentEnv === env"
            (click)="switchEnvironment(env)">
            {{env}}
          </button>
        </div>
      </div>

      <div class="features-grid">
        <!-- New User Flow - Gradual Rollout -->
        <div class="feature-card" [class.enabled]="isFeatureEnabled('newUserFlow')">
          <h3>New User Flow</h3>
          <div class="feature-meta">
            <span class="version">v{{getFeatureVersion('newUserFlow')}}</span>
            <span class="strategy">{{getFeatureStrategy('newUserFlow')}}</span>
          </div>
          <p>Demonstrates gradual rollout (25% of users)</p>
          <div class="feature-content" *ngIf="isFeatureEnabled('newUserFlow')">
            <p>✨ Welcome to the new onboarding experience!</p>
          </div>
        </div>

        <!-- Enhanced Search - Instant Release -->
        <div class="feature-card" [class.enabled]="isFeatureEnabled('enhancedSearch')">
          <h3>Enhanced Search</h3>
          <div class="feature-meta">
            <span class="version">v{{getFeatureVersion('enhancedSearch')}}</span>
            <span class="strategy">{{getFeatureStrategy('enhancedSearch')}}</span>
          </div>
          <p>Demonstrates instant release across all environments</p>
          <div class="feature-content" *ngIf="isFeatureEnabled('enhancedSearch')">
            <p>🔍 Enhanced search is active</p>
          </div>
        </div>

        <!-- Dark Mode - A/B Testing -->
        <div class="feature-card" [class.enabled]="isFeatureEnabled('darkMode')">
          <h3>Dark Mode</h3>
          <div class="feature-meta">
            <span class="version">v{{getFeatureVersion('darkMode')}}</span>
            <span class="strategy">{{getFeatureStrategy('darkMode')}}</span>
          </div>
          <p>Demonstrates A/B testing functionality</p>
          <div class="feature-content" *ngIf="isFeatureEnabled('darkMode')">
            <p>🌙 You are in test group: {{getABTestGroup('darkMode')}}</p>
          </div>
        </div>
      </div>

      <div class="info-panel">
        <h3>Trunk-Based Development Practices Demonstrated:</h3>
        <ul>
          <li>Feature flags enabling continuous deployment to trunk</li>
          <li>Environment-specific feature availability</li>
          <li>Gradual rollout capabilities</li>
          <li>A/B testing infrastructure</li>
          <li>Version tracking for features</li>
          <li>Feature dependencies management</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .trunk-based-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .environment-selector {
      margin-bottom: 2rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: white;
      cursor: pointer;
    }

    button.active {
      background: #4a90e2;
      color: white;
      border-color: #4a90e2;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .feature-card {
      padding: 1.5rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      background: #f8f9fa;
      transition: all 0.3s ease;
    }

    .feature-card.enabled {
      border-color: #4a90e2;
      box-shadow: 0 2px 8px rgba(74, 144, 226, 0.1);
    }

    .feature-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .version {
      background: #e9ecef;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }

    .strategy {
      background: #e7f5ff;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      color: #1971c2;
    }

    .feature-content {
      margin-top: 1rem;
      padding: 1rem;
      background: white;
      border-radius: 4px;
    }

    .info-panel {
      padding: 1.5rem;
      background: #f1f3f5;
      border-radius: 8px;
      margin-top: 2rem;
    }

    .info-panel ul {
      margin: 0;
      padding-left: 1.5rem;
    }

    .info-panel li {
      margin: 0.5rem 0;
    }
  `]
})
export class TrunkBasedComponent implements OnInit {
  environments = Object.values(Environment);
  currentEnv = Environment.Development;
  featureConfigs: { [key: string]: any } = {};

  constructor(private featureFlagsService: FeatureFlagsService) {
    // Initialize feature configurations
    ['newUserFlow', 'enhancedSearch', 'darkMode'].forEach(feature => {
      this.featureFlagsService.getFeatureConfig(feature as any).subscribe(config => {
        this.featureConfigs[feature] = config;
      });
    });
  }

  ngOnInit() {
    this.switchEnvironment(Environment.Development);
  }

  switchEnvironment(env: Environment) {
    this.currentEnv = env;
    this.featureFlagsService.setEnvironment(env);
  }

  isFeatureEnabled(feature: string) {
    return this.featureFlagsService.isFeatureEnabled(feature as any);
  }

  getFeatureVersion(feature: string): string {
    return this.featureConfigs[feature]?.version || 'N/A';
  }

  getFeatureStrategy(feature: string): string {     
    const strategy = this.featureConfigs[feature]?.strategy;
    return strategy ? RolloutStrategy[strategy as keyof typeof RolloutStrategy] : 'N/A';
  }

  getABTestGroup(feature: string): string {
    return this.featureConfigs[feature]?.abTestGroup || 'N/A';
  }
}
