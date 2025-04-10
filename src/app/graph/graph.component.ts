import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Plotly from 'plotly.js-dist-min';

interface TraceInfo {
  name: string;
  visible: boolean;
  color: string;
}

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="graph-container">
      <div #plotContainer></div>
      <div class="custom-legend">
        <div *ngFor="let trace of traces" class="legend-item">
          <label [style.color]="trace.color">
            <input type="checkbox" 
                   [checked]="trace.visible" 
                   (change)="toggleTrace(trace)">
            {{ trace.name }}
          </label>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 400px;
    }
    .graph-container {
      display: flex;
      gap: 20px;
    }
    .custom-legend {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      min-width: 150px;
    }
    .legend-item {
      margin: 8px 0;
    }
    .legend-item label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
  `]
})
export class GraphComponent implements OnInit {
  @ViewChild('plotContainer') plotContainer!: ElementRef;
  traces: TraceInfo[] = [];
  private plot: any;

  constructor() {}

  ngOnInit() {
    // Initialize traces info
    this.traces = [
      { name: 'Series A', visible: true, color: '#1f77b4' },
      { name: 'Series B', visible: true, color: '#ff7f0e' }
    ];
  }

  ngAfterViewInit() {
    this.createPlot();
  }

  private createPlot() {
    const data = [
      {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter',
        name: 'Series A',
        line: { color: '#1f77b4' }
      },
      {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
        type: 'scatter',
        name: 'Series B',
        line: { color: '#ff7f0e' }
      }
    ];

    const layout = {
      title: 'Sample Graph',
      showlegend: false, // We hide the default legend since we're using our custom one
    };

    this.plot = Plotly.newPlot(this.plotContainer.nativeElement, data, layout);
  }

  toggleTrace(trace: TraceInfo) {
    trace.visible = !trace.visible;
    
    const update = {
      visible: this.traces.map(t => t.visible)
    };

    Plotly.restyle(this.plotContainer.nativeElement, update, [0, 1]);
  }
}
