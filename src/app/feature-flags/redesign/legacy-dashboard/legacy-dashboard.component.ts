import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legacy-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="old-design">
      <h3>Current Dashboard</h3>
      <table class="legacy-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monthly Active Users</td>
            <td>12.5K</td>
            <td>
              <button>View</button>
              <button>Export</button>
            </td>
          </tr>
          <tr>
            <td>Average Response Time</td>
            <td>250ms</td>
            <td>
              <button>Optimize</button>
              <button>Report</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .old-design {
      padding: 20px;
    }
    
    .legacy-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    
    .legacy-table th,
    .legacy-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    .legacy-table th {
      background-color: #f5f5f5;
    }
    
    button {
      margin: 0 5px;
      padding: 5px 10px;
      background: #e0e0e0;
      border: 1px solid #ccc;
      border-radius: 3px;
      cursor: pointer;
    }
  `]
})
export class LegacyDashboardComponent {}
