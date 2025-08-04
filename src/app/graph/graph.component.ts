import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as Plotly from 'plotly.js-dist-min';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="legend-controls">
      <div *ngFor="let series of seriesData" class="legend-item">
        <label>
          <input type="checkbox" [(ngModel)]="series.visible" (ngModelChange)="updateVisibility()">
          {{ series.name }}
        </label>
      </div>
    </div>
    <div #plotContainer></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
    }
    .legend-controls {
      margin-bottom: 15px;
    }
    .legend-item {
      display: inline-block;
      margin-right: 15px;
    }
    .legend-item label {
      cursor: pointer;
    }
  `]
})
export class GraphComponent implements AfterViewInit {
  @ViewChild('plotContainer') private plotContainer!: ElementRef;

  seriesData = [
    {
      name: 'Series A',
      visible: true,
      data: {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter',
        mode: 'lines+markers'
      } as Partial<Plotly.ScatterData>
    },
    {
      name: 'Series B',
      visible: true,
      data: {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
        type: 'scatter',
        mode: 'lines+markers'
      } as Partial<Plotly.ScatterData>
    }
  ];

  private layout: Partial<Plotly.Layout> = {
    title: 'Sample Graph',
    showlegend: true,
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1
    }
  };

  ngAfterViewInit() {
    this.updatePlot();
  }

  updateVisibility() {
    this.updatePlot();
  }

  private updatePlot() {
    const visibleTraces = this.seriesData
      .filter(series => series.visible)
      .map(series => ({ ...series.data, name: series.name }));

    Plotly.newPlot(this.plotContainer.nativeElement, visibleTraces, this.layout);
  }
}
