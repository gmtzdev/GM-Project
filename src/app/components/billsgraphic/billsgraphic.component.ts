import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FinancesService } from '../../shared/services/finances/finances.service';
import { lastValueFrom } from 'rxjs';
import { HttpResponse } from '../../shared/models/http/HttpResponse.model';

@Component({
  selector: 'app-billsgraphic',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './billsgraphic.component.html',
  styleUrl: './billsgraphic.component.scss'
})
export class BillsgraphicComponent implements OnInit {

  view: [number, number] = [800, 300];

  multi: NgxChartsLineChartFormat[] = [
    {
      name: 'Bills',
      series: []
    }
  ]

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Amount';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    private financesService: FinancesService
  ) { }

  ngOnInit(): void {
    this.initializer()
  }

  private async initializer() {
    this.financesService.getBillsInFormat().subscribe((billsResponse: HttpResponse) => {
      if (billsResponse.success) {
        const [data] = this.multi
        let newData: NgxChartsLineChartSeries[] = [];
        for (let s of billsResponse.object.data.series) {
          let name = new Date(s.name);
          let value = s.value;
          newData.push({ name, value } as NgxChartsLineChartSeries);
        }
        this.multi[0].series = data.series.concat(newData);
        this.multi = [...this.multi]
      }
    })
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}

interface NgxChartsLineChartSeries {
  name: Date
  value: number
}
interface NgxChartsLineChartFormat {
  name: string;
  series: NgxChartsLineChartSeries[]
}
