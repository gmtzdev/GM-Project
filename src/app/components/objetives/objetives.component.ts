import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-objetives',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './objetives.component.html',
  styleUrl: './objetives.component.scss'
})
export class ObjetivesComponent {
  view: [number, number] = [850, 300];
  colorScheme:any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  single: any[] =
    [
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

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
