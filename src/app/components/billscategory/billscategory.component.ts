import { Component, OnInit } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-billscategory',
  standalone: true,
  imports: [
    NgxChartsModule
  ],
  templateUrl: './billscategory.component.html',
  styleUrl: './billscategory.component.scss'
})
export class BillscategoryComponent implements OnInit{

  view: [number, number] = [450, 300];
  colorScheme: any = {
    domain: [
      '#4735DD',
      '#FF3E6C',
      '#FFA200',
      '#AAAAAA'
    ]
  }
  
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  showLabels: boolean = true;
  isDoughnut: boolean = true;

  // showXAxis: boolean = true;
  // showYAxis: boolean = true;
  // showXAxisLabel: boolean = true;
  // showYAxisLabel: boolean = true;
  // xAxisLabel: string = 'Mes';
  // yAxisLabel: string = 'Pesos MXN';
  // legendTitle: string = 'Movimientos';

  single: any[] = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
    {
      "name": "UK",
      "value": 6200000
    },
    {
      "name": "Italy",
      "value": 4200000
    },
    {
      "name": "Spain",
      "value": 8200000
    }
  ];

  ngOnInit(): void {
      this.initializer()
  }

  private async initializer(){

  }

  onSelect($event: any): void {

  }
  onActivate($event: any): void {

  }
  onDeactivate($event: any): void {

  }
}
