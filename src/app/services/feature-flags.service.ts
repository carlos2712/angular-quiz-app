import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production'
}

export enum RolloutStrategy {
  Instant = 'instant',
  Gradual = 'gradual',
  ABTest = 'ab-test'
}

export interface FeatureConfig {
  enabled: boolean;
  version: string;
  rolloutPercentage?: number;
  strategy: RolloutStrategy;
  abTestGroup?: 'A' | 'B' | null;
  environments: Environment[];
  dependencies?: string[];
}

export interface FeatureFlags {
  // Trunk-based development features
  newUserFlow: FeatureConfig;        // New user onboarding flow being developed in trunk
  enhancedSearch: FeatureConfig;     // Search enhancement in development
  darkMode: FeatureConfig;           // Dark mode feature with A/B testing
  
  // Legacy features for comparison
  enableNewHeader: boolean;          
  enableBetaFeatures: boolean;       
  enableAdvancedSearch: boolean;     
  enableCustomThemes: boolean;       
  enableLegacyMode: boolean;         
  enableModernUI: boolean;           
  enableExperimentalFeatures: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  private currentEnvironment: Environment = Environment.Development;
  private readonly USER_ID = Math.random().toString(36).substr(2, 9); // Simulate user ID

  private flags = new BehaviorSubject<FeatureFlags>({
    // Trunk-based development features
    newUserFlow: {
      enabled: true,
      version: '1.0.0',
      rolloutPercentage: 25,
      strategy: RolloutStrategy.Gradual,
      environments: [Environment.Development, Environment.Staging],
      dependencies: []
    },
    enhancedSearch: {
      enabled: true,
      version: '2.1.0',
      strategy: RolloutStrategy.Instant,
      environments: [Environment.Development, Environment.Staging, Environment.Production],
      dependencies: []
    },
    darkMode: {
      enabled: true,
      version: '1.5.0',
      strategy: RolloutStrategy.ABTest,
      abTestGroup: this.assignABTestGroup(),
      environments: [Environment.Development, Environment.Staging],
      dependencies: []
    },

    // Legacy flags for comparison
    enableNewHeader: true,
    enableBetaFeatures: true,
    enableAdvancedSearch: true,
    enableCustomThemes: false,
    enableLegacyMode: true,
    enableModernUI: true,
    enableExperimentalFeatures: true
  });

  private isInRolloutPercentage(percentage: number): boolean {
    const hash = this.hashString(this.USER_ID);
    return (hash % 100) < percentage;
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private assignABTestGroup(): 'A' | 'B' | null {
    const hash = this.hashString(this.USER_ID);
    return hash % 2 === 0 ? 'A' : 'B';
  }

  setEnvironment(env: Environment): void {
    this.currentEnvironment = env;
    this.refreshFlags();
  }

  private refreshFlags(): void {
    const currentFlags = this.flags.value;
    // Refresh feature states based on environment and rollout rules
    this.flags.next(currentFlags);
  }

  isFeatureEnabled(featureName: keyof FeatureFlags): boolean {
    const feature = this.flags.value[featureName];
    
    if (typeof feature === 'boolean') {
      return feature; // Legacy flag
    }

    // Check if feature is enabled for current environment
    if (!feature.environments.includes(this.currentEnvironment)) {
      return false;
    }

    // Check dependencies
    if (feature.dependencies?.length) {
      const areDependenciesMet = feature.dependencies.every(dep => 
        this.isFeatureEnabled(dep as keyof FeatureFlags)
      );
      if (!areDependenciesMet) return false;
    }

    switch (feature.strategy) {
      case RolloutStrategy.Instant:
        return feature.enabled;
      case RolloutStrategy.Gradual:
        return feature.enabled && this.isInRolloutPercentage(feature.rolloutPercentage || 0);
      case RolloutStrategy.ABTest:
        return feature.enabled && feature.abTestGroup !== null;
      default:
        return false;
    }
  }

  getFeatureConfig(featureName: keyof FeatureFlags): Observable<FeatureConfig | null> {
    return this.flags.pipe(
      map(flags => {
        const feature = flags[featureName];
        return typeof feature === 'object' ? feature : null;
      })
    );
  }

  // Legacy methods for backward compatibility
  isBetaFeatureEnabled(featureName: 'enableAdvancedSearch' | 'enableCustomThemes'): boolean {
    return this.flags.value.enableBetaFeatures && this.flags.value[featureName];
  }
}
