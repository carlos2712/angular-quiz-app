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
            <span class="version" [class.deprecated]="isFeatureDeprecated('darkMode')">
              {{getFeatureVersion('darkMode')}}
            </span>
            <span class="strategy">{{getFeatureStrategy('darkMode')}}</span>
            <span class="variant">Variant: {{getFeatureVariant('darkMode')}}</span>
          </div>
          <p>Demonstrates A/B testing functionality</p>
          <div class="feature-content" *ngIf="isFeatureEnabled('darkMode')">
            <p>🌙 You are in test group: {{getABTestGroup('darkMode')}}</p>
          </div>
          <div class="feature-metrics">
            <h4>Metrics</h4>
            <p>{{getFeatureMetrics('darkMode')}}</p>
          </div>
          <div class="feature-controls">
            <button (click)="toggleKillswitch('darkMode')" class="control-btn">
              Toggle Killswitch
            </button>
          </div>
        </div>
      </div>

      <div class="info-panel">
        <h3>Advanced Feature Flag Capabilities:</h3>
        <ul>
          <li>🎯 User targeting and segmentation</li>
          <li>📊 Real-time metrics tracking</li>
          <li>🚨 Emergency killswitch system</li>
          <li>📅 Scheduled feature activation</li>
          <li>🔄 Feature variants and A/B testing</li>
          <li>📈 Performance monitoring</li>
          <li>🔒 Environment-specific controls</li>
          <li>⚡ Instant/Gradual deployment options</li>
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

    .feature-metrics {
      margin-top: 1rem;
      padding: 0.5rem;
      background: #f8f9fa;
      border-radius: 4px;
      font-size: 0.875rem;
    }

    .feature-metrics h4 {
      margin: 0 0 0.5rem 0;
      color: #495057;
    }

    .feature-controls {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem;
    }

    .control-btn {
      padding: 0.5rem 1rem;
      background: #e9ecef;
      border: 1px solid #ced4da;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }

    .control-btn:hover {
      background: #dee2e6;
    }

    .version.deprecated {
      background: #ffe3e3;
      color: #c92a2a;
    }

    .variant {
      background: #e3fafc;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      color: #0c8599;
    }
  `]
})
export class TrunkBasedComponent implements OnInit {
  environments = Object.values(Environment);
  currentEnv = Environment.Development;
  featureConfigs: { [key: string]: any } = {};
  metrics: { [key: string]: any } = {};

  constructor(private featureFlagsService: FeatureFlagsService) {
    // Initialize feature configurations and start monitoring
    ['newUserFlow', 'enhancedSearch', 'darkMode'].forEach(feature => {
      this.initializeFeature(feature);
      this.startMetricsMonitoring(feature);
    });
  }

  private initializeFeature(feature: string) {
    this.featureFlagsService.getFeatureConfig(feature as any).subscribe(config => {
      this.featureConfigs[feature] = config;
      if (config?.metrics) {
        this.metrics[feature] = config.metrics;
      }
    });
  }

  private startMetricsMonitoring(feature: string) {
    // Simulate metrics updates
    setInterval(() => {
      const metrics = this.featureFlagsService.getFeatureMetrics(feature as any);
      if (metrics) {
        this.metrics[feature] = metrics;
      }
    }, 5000);
  }

  ngOnInit() {
    this.switchEnvironment(Environment.Development);
  }

  switchEnvironment(env: Environment) {
    this.currentEnv = env;
    this.featureFlagsService.setEnvironment(env);
    // Re-initialize features for new environment
    Object.keys(this.featureConfigs).forEach(feature => {
      this.initializeFeature(feature);
    });
  }

  isFeatureEnabled(feature: string) {
    const isEnabled = this.featureFlagsService.isFeatureEnabled(feature as any);
    if (isEnabled) {
      // Track feature interaction
      this.featureFlagsService.trackFeatureInteraction(feature as any, 'view', {
        environment: this.currentEnv
      });
    }
    return isEnabled;
  }

  getFeatureVersion(feature: string): string {
    const config = this.featureConfigs[feature];
    if (!config?.versionInfo) return 'N/A';
    
    const { major, minor, patch, status } = config.versionInfo;
    return `v${major}.${minor}.${patch} (${status})`;
  }

  getFeatureStrategy(feature: string): string {     
    const strategy = this.featureConfigs[feature]?.strategy;
    return strategy ? RolloutStrategy[strategy as keyof typeof RolloutStrategy] : 'N/A';
  }

  getABTestGroup(feature: string): string {
    return this.featureConfigs[feature]?.abTestGroup || 'N/A';
  }

  getFeatureMetrics(feature: string): string {
    const metrics = this.metrics[feature];
    if (!metrics) return 'No metrics available';

    return `Views: ${metrics.exposures} | 
            Interactions: ${metrics.interactions} | 
            Errors: ${metrics.errors}`;
  }

  toggleKillswitch(feature: string) {
    const config = this.featureConfigs[feature];
    if (config?.killswitch) {
      const reason = !config.killswitch.enabled ? 
        'Emergency deactivation for testing' : 
        '';
      
      this.featureFlagsService.activateKillswitch(feature as any, reason);
      this.initializeFeature(feature);
    }
  }

  isFeatureDeprecated(feature: string): boolean {
    return this.featureFlagsService.isFeatureDeprecated(feature as any);
  }

  getFeatureVariant(feature: string): string {
    return this.featureFlagsService.getFeatureVariant(feature as any) || 'default';
  }
}
