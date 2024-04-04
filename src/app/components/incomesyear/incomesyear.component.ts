import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FinancesService } from '../../shared/services/finances/finances.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-incomesyear',
  standalone: true,
  imports: [
    NgxChartsModule,
  ],
  templateUrl: './incomesyear.component.html',
  styleUrl: './incomesyear.component.scss',
  animations: []
})
export class IncomesyearComponent implements OnInit {
  view: [number, number] = [805, 300];
  colorScheme: any = {
    domain: [
      '#4735DD',
      '#FF3E6C',
      '#FFA200',
      '#AAAAAA'
    ]
  }
  multi: any[] = [];
  gradient: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Mes';
  yAxisLabel: string = 'Pesos MXN';
  legendTitle: string = 'Movimientos';

  constructor(
    private financesService: FinancesService
  ){

  }

  ngOnInit(): void {
    this.initializer();
  }
  
  async initializer(){
    const year = new Date().getFullYear();
    this.multi = await lastValueFrom(this.financesService.getIncomesVsBills(year));
  }

  onSelect($event: any): void {

  }
  onActivate($event: any): void {

  }
  onDeactivate($event: any): void {

  }
}
