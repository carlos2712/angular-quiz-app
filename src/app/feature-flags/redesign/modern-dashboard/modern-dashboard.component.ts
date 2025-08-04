import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modern-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="new-design">
      <h3>New Dashboard Design</h3>
      <div class="card-container">
        <div class="modern-card">
          <h4>Analytics</h4>
          <p>Monthly active users: 12.5K</p>
          <div class="actions">
            <button class="primary">View Details</button>
            <button class="secondary">Export</button>
          </div>
        </div>
        
        <div class="modern-card">
          <h4>Performance</h4>
          <p>Average response time: 250ms</p>
          <div class="actions">
            <button class="primary">Optimize</button>
            <button class="secondary">Report</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .new-design {
      padding: 20px;
    }
    
    .card-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .modern-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    
    button {
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }
    
    .primary {
      background: #0066cc;
      color: white;
    }
    
    .secondary {
      background: #f0f0f0;
      color: #333;
    }
  `]
})
export class ModernDashboardComponent {}
