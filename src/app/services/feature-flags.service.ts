import { Injectable } from '@angular/core';

export interface FeatureFlags {
  enableNewHeader: boolean;          // Simple flag - Easy use case
  enableBetaFeatures: boolean;       // Parent flag for complex features
  enableAdvancedSearch: boolean;     // Child feature under beta
  enableCustomThemes: boolean;       // Child feature under beta
  enableLegacyMode: boolean;         // Conflicting flag - Bad practice
  enableModernUI: boolean;           // Conflicting flag - Bad practice
  enableExperimentalFeatures: boolean; // Overlapping flag - Bad practice
}

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  private flags: FeatureFlags = {
    enableNewHeader: true,
    enableBetaFeatures: true,
    enableAdvancedSearch: true,
    enableCustomThemes: false,
    enableLegacyMode: true,
    enableModernUI: true,
    enableExperimentalFeatures: true
  };

  getFlags(): FeatureFlags {
    return this.flags;
  }

  isFeatureEnabled(flagName: keyof FeatureFlags): boolean {
    return this.flags[flagName];
  }

  // Method to demonstrate complex feature checking
  isBetaFeatureEnabled(featureName: 'enableAdvancedSearch' | 'enableCustomThemes'): boolean {
    return this.flags.enableBetaFeatures && this.flags[featureName];
  }
}
