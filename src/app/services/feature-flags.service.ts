import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AnalyticsService } from './analytics.service';

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production'
}

export enum RolloutStrategy {
  Instant = 'instant',
  Gradual = 'gradual',
  ABTest = 'ab-test',
  Scheduled = 'scheduled',
  UserTargeted = 'user-targeted'
}

export interface VersionInfo {
  major: number;
  minor: number;
  patch: number;
  status: 'alpha' | 'beta' | 'stable' | 'deprecated';
  releaseDate: Date;
  endOfLife?: Date;
}

export interface UserSegment {
  id: string;
  name: string;
  conditions: {
    attribute: string;
    operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
    value: any;
  }[];
}

export interface Schedule {
  startDate?: Date;
  endDate?: Date;
  timeZone?: string;
  daysOfWeek?: number[];  // 0-6 for Sunday-Saturday
  hoursOfDay?: number[];  // 0-23
}

export interface FeatureDependency {
  featureName: string;
  version?: string;
  condition?: 'enabled' | 'disabled' | 'specific-version';
  fallback?: 'disable' | 'enable' | 'warn';
}

export interface FeatureMetrics {
  exposures: number;
  interactions: number;
  errors: number;
  lastAccessed?: Date;
  performance?: {
    avgResponseTime: number;
    errorRate: number;
  };
}

export interface FeatureConfig {
  enabled: boolean;
  version: string;
  versionInfo: VersionInfo;
  rolloutPercentage?: number;
  strategy: RolloutStrategy;
  abTestGroup?: 'A' | 'B' | null;
  environments: Environment[];
  dependencies?: FeatureDependency[];
  userSegments?: UserSegment[];
  schedule?: Schedule;
  killswitch?: {
    enabled: boolean;
    reason?: string;
    activatedBy?: string;
    activatedAt?: Date;
  };
  metrics?: FeatureMetrics;
  variants?: {
    [key: string]: {
      enabled: boolean;
      config: any;
    };
  };
}

export interface UserAttributes {
  id: string;
  email: string;
  role: string;
  region: string;
  registrationDate: Date;
  preferences: {
    theme: string;
  };
  [key: string]: any; // Allow for dynamic attributes
}

export type FeatureFlags = {
  // Trunk-based development features
  newUserFlow: FeatureConfig;        // New user onboarding flow being developed in trunk
  enhancedSearch: FeatureConfig;     // Search enhancement in development
  darkMode: FeatureConfig;           // Dark mode feature with A/B testing
} & {
  // Legacy features for comparison
  [key: string]: FeatureConfig | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  private currentEnvironment: Environment = Environment.Development;
  private readonly USER_ID = Math.random().toString(36).substr(2, 9); // Simulate user ID

  private currentUser: UserAttributes = {
    id: 'test-user-1',
    email: 'test@example.com',
    role: 'user',
    region: 'NA',
    registrationDate: new Date('2025-07-01'),
    preferences: {
      theme: 'light'
    }
  };

  private flags = new BehaviorSubject<FeatureFlags>({
    // Trunk-based development features
    newUserFlow: {
      enabled: true,
      version: '1.0.0',
      versionInfo: {
        major: 1,
        minor: 0,
        patch: 0,
        status: 'beta',
        releaseDate: new Date('2025-08-01'),
      },
      rolloutPercentage: 25,
      strategy: RolloutStrategy.Gradual,
      environments: [Environment.Development, Environment.Staging],
      dependencies: [{
        featureName: 'enhancedSearch',
        condition: 'enabled',
        fallback: 'disable'
      }],
      userSegments: [{
        id: 'new-users',
        name: 'New Users',
        conditions: [{
          attribute: 'registrationDate',
          operator: 'greaterThan',
          value: new Date('2025-07-01')
        }]
      }],
      schedule: {
        startDate: new Date('2025-08-01'),
        endDate: new Date('2025-12-31'),
        daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
        hoursOfDay: Array.from({length: 24}, (_, i) => i) // All hours
      },
      metrics: {
        exposures: 0,
        interactions: 0,
        errors: 0,
        performance: {
          avgResponseTime: 0,
          errorRate: 0
        }
      }
    },
    enhancedSearch: {
      enabled: true,
      version: '2.1.0',
      versionInfo: {
        major: 2,
        minor: 1,
        patch: 0,
        status: 'stable',
        releaseDate: new Date('2025-07-15')
      },
      strategy: RolloutStrategy.Instant,
      environments: [Environment.Development, Environment.Staging, Environment.Production],
      dependencies: [],
      variants: {
        'default': {
          enabled: true,
          config: { algorithm: 'standard' }
        },
        'advanced': {
          enabled: true,
          config: { algorithm: 'ml-enhanced' }
        }
      },
      metrics: {
        exposures: 0,
        interactions: 0,
        errors: 0,
        performance: {
          avgResponseTime: 150,
          errorRate: 0.01
        }
      }
    },
    darkMode: {
      enabled: true,
      version: '1.5.0',
      versionInfo: {
        major: 1,
        minor: 5,
        patch: 0,
        status: 'beta',
        releaseDate: new Date('2025-07-30')
      },
      strategy: RolloutStrategy.ABTest,
      abTestGroup: null, // Will be set in constructor
      environments: [Environment.Development, Environment.Staging],
      dependencies: [],
      killswitch: {
        enabled: false,
        reason: '',
        activatedBy: '',
        activatedAt: undefined
      },
      metrics: {
        exposures: 0,
        interactions: 0,
        errors: 0
      }
    },
    ...{
      // Legacy flags as boolean values
      ['enableNewHeader']: true,
      ['enableBetaFeatures']: true,
      ['enableAdvancedSearch']: true,
      ['enableCustomThemes']: false,
      ['enableLegacyMode']: true,
      ['enableModernUI']: true,
      ['enableExperimentalFeatures']: true
    }
  } as FeatureFlags);

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

  constructor(private analytics: AnalyticsService) {}

  private refreshFlags(): void {
    const currentFlags = this.flags.value;
    Object.keys(currentFlags).forEach(key => {
      const feature = currentFlags[key as keyof FeatureFlags];
      if (typeof feature === 'object') {
        if (feature.metrics) {
          feature.metrics.lastAccessed = new Date();
        }
      }
    });
    this.flags.next(currentFlags);
  }

  private isScheduleActive(schedule?: Schedule): boolean {
    if (!schedule) return true;

    const now = new Date();
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Check date range
    if (schedule.startDate && now < schedule.startDate) return false;
    if (schedule.endDate && now > schedule.endDate) return false;

    // Check day of week
    if (schedule.daysOfWeek && !schedule.daysOfWeek.includes(now.getDay())) return false;

    // Check hour of day
    if (schedule.hoursOfDay && !schedule.hoursOfDay.includes(now.getHours())) return false;

    return true;
  }

  private checkDependencies(dependencies?: FeatureDependency[]): boolean {
    if (!dependencies?.length) return true;

    return dependencies.every(dep => {
      const depFeature = this.flags.value[dep.featureName as keyof FeatureFlags];
      
      if (!depFeature || typeof depFeature === 'boolean') {
        return dep.fallback === 'enable';
      }

      switch (dep.condition) {
        case 'enabled':
          return this.isFeatureEnabled(dep.featureName as keyof FeatureFlags);
        case 'disabled':
          return !this.isFeatureEnabled(dep.featureName as keyof FeatureFlags);
        case 'specific-version':
          return dep.version === depFeature.version;
        default:
          return dep.fallback === 'enable';
      }
    });
  }

  private matchesUserSegment(segments?: UserSegment[]): boolean {
    if (!segments?.length) return true;

    return segments.some(segment => {
      return segment.conditions.every(condition => {
        const userValue = this.currentUser[condition.attribute];
        switch (condition.operator) {
          case 'equals':
            return userValue === condition.value;
          case 'contains':
            return userValue.includes(condition.value);
          case 'greaterThan':
            return userValue > condition.value;
          case 'lessThan':
            return userValue < condition.value;
          default:
            return false;
        }
      });
    });
  }

  isFeatureEnabled(featureName: keyof FeatureFlags): boolean {
    const feature = this.flags.value[featureName];
    
    if (typeof feature === 'boolean') {
      return feature; // Legacy flag
    }

    try {
      // Emergency killswitch check
      if (feature.killswitch?.enabled) {
        this.analytics.trackFeatureExposure(featureName as string, feature.version, { 
          status: 'killed',
          reason: feature.killswitch.reason 
        });
        return false;
      }

      // Basic checks
      if (!feature.enabled) return false;
      if (!feature.environments.includes(this.currentEnvironment)) return false;

      // Advanced checks
      const isScheduleValid = this.isScheduleActive(feature.schedule);
      const areDependenciesMet = this.checkDependencies(feature.dependencies);
      const matchesUserSegment = this.matchesUserSegment(feature.userSegments);

      if (!isScheduleValid || !areDependenciesMet || !matchesUserSegment) {
        return false;
      }

      let isEnabled = false;
      switch (feature.strategy) {
        case RolloutStrategy.Instant:
          isEnabled = true;
          break;
        case RolloutStrategy.Gradual:
          isEnabled = this.isInRolloutPercentage(feature.rolloutPercentage || 0);
          break;
        case RolloutStrategy.ABTest:
          isEnabled = feature.abTestGroup !== null;
          break;
        case RolloutStrategy.Scheduled:
          isEnabled = this.isScheduleActive(feature.schedule);
          break;
        case RolloutStrategy.UserTargeted:
          isEnabled = this.matchesUserSegment(feature.userSegments);
          break;
        default:
          isEnabled = false;
      }

      // Track metrics
      if (isEnabled && feature.metrics) {
        feature.metrics.exposures++;
        this.analytics.trackFeatureExposure(featureName as string, feature.version, {
          environment: this.currentEnvironment,
          strategy: feature.strategy,
          userId: this.currentUser.id
        });
      }

      return isEnabled;
    } catch (error) {
      this.analytics.trackError(featureName as string, error as Error, {
        environment: this.currentEnvironment,
        version: feature.version
      });
      return false;
    }
  }

  getFeatureConfig(featureName: keyof FeatureFlags): Observable<FeatureConfig | null> {
    return this.flags.pipe(
      map(flags => {
        const feature = flags[featureName];
        return typeof feature === 'object' ? feature : null;
      }),
      catchError(error => {
        this.analytics.trackError(featureName as string, error, {
          operation: 'getFeatureConfig',
          environment: this.currentEnvironment
        });
        return of(null);
      })
    );
  }

  activateKillswitch(featureName: keyof FeatureFlags, reason: string): void {
    const currentFlags = this.flags.value;
    const feature = currentFlags[featureName];

    if (typeof feature === 'object' && feature.killswitch) {
      feature.killswitch.enabled = true;
      feature.killswitch.reason = reason;
      feature.killswitch.activatedBy = this.currentUser.id;
      feature.killswitch.activatedAt = new Date();

      this.flags.next(currentFlags);
      this.analytics.trackFeatureUsage(featureName as string, 'killswitch_activated', {
        reason,
        environment: this.currentEnvironment
      });
    }
  }

  trackFeatureInteraction(featureName: keyof FeatureFlags, action: string, metadata: any = {}): void {
    const feature = this.flags.value[featureName];
    if (typeof feature === 'object' && feature.metrics) {
      feature.metrics.interactions++;
      this.analytics.trackFeatureUsage(featureName as string, action, {
        ...metadata,
        version: feature.version,
        environment: this.currentEnvironment
      });
    }
  }

  getFeatureVariant(featureName: keyof FeatureFlags): string | null {
    const feature = this.flags.value[featureName];
    if (typeof feature === 'object' && feature.variants) {
      // Implement variant selection logic (e.g., based on user, random, or specific rules)
      return Object.keys(feature.variants).find(key => feature.variants![key].enabled) || null;
    }
    return null;
  }

  isFeatureDeprecated(featureName: keyof FeatureFlags): boolean {
    const feature = this.flags.value[featureName];
    if (typeof feature === 'object' && feature.versionInfo) {
      return feature.versionInfo.status === 'deprecated' ||
        (feature.versionInfo.endOfLife ? new Date() > feature.versionInfo.endOfLife : false);
    }
    return false;
  }

  getFeatureMetrics(featureName: keyof FeatureFlags): FeatureMetrics | null {
    const feature = this.flags.value[featureName];
    return typeof feature === 'object' && feature.metrics ? feature.metrics : null;
  }

  // Check if a feature flag is enabled
  isEnabled(featureName: keyof FeatureFlags): boolean {
    const flag = this.flags.value[featureName];
    
    // Handle legacy boolean flags
    if (typeof flag === 'boolean') {
      return this.flags.value['enableBetaFeatures'] && flag;
    }
    
    // Handle new FeatureConfig flags
    if (flag && typeof flag === 'object') {
      return flag.enabled;
    }
    
    return false;
  }

  // Legacy methods for backward compatibility
  isBetaFeatureEnabled(featureName: 'enableAdvancedSearch' | 'enableCustomThemes'): boolean {
    const flag = this.flags.value[featureName];
    return typeof flag === 'boolean' && this.flags.value['enableBetaFeatures'] && flag;
  }
}
