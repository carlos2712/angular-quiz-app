import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  trackFeatureExposure(featureName: string, version: string, metadata: any) {
    console.log(`Feature Exposure: ${featureName}, version ${version}`, metadata);
    // In real implementation, send to analytics service
  }

  trackFeatureUsage(featureName: string, action: string, metadata: any) {
    console.log(`Feature Usage: ${featureName}, action: ${action}`, metadata);
    // In real implementation, send to analytics service
  }

  trackError(featureName: string, error: Error, metadata: any) {
    console.error(`Feature Error: ${featureName}`, error, metadata);
    // In real implementation, send to error tracking service
  }
}
