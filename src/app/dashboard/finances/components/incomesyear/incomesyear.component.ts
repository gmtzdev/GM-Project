import { Component, OnInit } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { FinancesService } from '../../core/services/finances.service';
import { HttpResponse } from '../../../../shared/models/http/HttpResponse.model';
import { IncomesVsBill } from '../../core/models/IncomesVsBill.model';

@Component({
  selector: 'app-incomesyear',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './incomesyear.component.html',
  styleUrl: './incomesyear.component.scss',
  animations: [],
})
export class IncomesyearComponent implements OnInit {
  view: [number, number] = [805, 300];
  colorScheme: Color = {
    domain: ['#0006ff', '#1ef50d', '#FFA200', '#AAAAAA'],
    name: 'MyColorsTwo',
    selectable: false,
    group: ScaleType.Linear,
  };
  multi: IncomesVsBill[] = [];
  gradient: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Mes';
  yAxisLabel: string = 'Pesos MXN';
  legendTitle: string = 'Movimientos';

  constructor(private financesService: FinancesService) {}

  ngOnInit(): void {
    this.initializer();
  }

  async initializer() {
    const year = new Date().getFullYear();
    this.financesService.getIncomesVsBills(year).subscribe({
      next: (response: HttpResponse) => {
        this.multi = response.data as IncomesVsBill[];
      },
    });
  }

  // onSelect($event: any): void {

  // }
  // onActivate($event: any): void {

  // }
  // onDeactivate($event: any): void {

  // }
}