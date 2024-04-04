import { Component, OnInit } from '@angular/core';
import { CardHome } from '../../shared/models/CardHome.model';
import { CardComponent } from '../../components/card/card.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IncomesyearComponent } from '../../components/incomesyear/incomesyear.component';
import { BillscategoryComponent } from '../../components/billscategory/billscategory.component';
import { BillsgraphicComponent } from '../../components/billsgraphic/billsgraphic.component';
import { ObjetivesComponent } from '../../components/objetives/objetives.component';
import { FinancesService } from '../../shared/services/finances/finances.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [
    CardComponent,
    IncomesyearComponent,
    ObjetivesComponent,
    BillscategoryComponent,
    BillsgraphicComponent,

    NgxChartsModule],
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.scss'
})
export class FinancesComponent implements OnInit {
  private incomeIndex = 0;
  public incomesPer: number[] = [];

  public cards: CardHome[] = [
    { id: 1, icon: 'fa-sack-dollar', destination: 'addIncome', title: 'Incomes', subtitle: 'year', subject: '$0' },
    { id: 2, icon: 'fa-circle-dollar-to-slot', destination: 'addBill', title: 'Bills', subtitle: '', subject: '$20,000' },
    { id: 3, icon: 'fa-cart-shopping', destination: '', title: 'Top Category', subtitle: '', subject: 'Alimentación' },
    { id: 4, icon: 'fa-credit-card', destination: '', title: 'Pay at', subtitle: '', subject: '50 days' }
  ]


  view: [number, number] = [805, 300];
  colorScheme: any = {
    domain: [
      '#5AA454',
      '#C7B42C',
      '#AAAAAA'
    ]
  }

  // gradient: boolean = false;
  // showXAxis: boolean = true;
  // showYAxis: boolean = true;
  // showLegend: boolean = true;
  // showXAxisLabel: boolean = true;
  // showYAxisLabel: boolean = true;
  // xAxisLabel: string = 'Mes';
  // yAxisLabel: string = 'Pesos MXN';
  // legendTitle: string = 'Movimientos';

  constructor(
    private financesService: FinancesService
  ) { }

  async ngOnInit(): Promise<void> {
    const incomesPer = await lastValueFrom(this.financesService.getIncomesPer());
    if (incomesPer.success) {
      this.incomesPer = incomesPer.object.incomesPer;
      this.cards[0].subject = this.financesService.toMoneyFormat(this.incomesPer[this.incomeIndex]);
    }
  }


  public changeCard(id: number) {
    switch (id) {
      case 1:
        this.changeCardIncome();
        break;
    }
  }
  private changeCardIncome() {
    let subtitle: string;
    let subject: string;
    this.incomeIndex++;
    switch (this.incomeIndex) {
      case 0:
        subtitle = 'year';
        subject = this.financesService.toMoneyFormat(this.incomesPer[this.incomeIndex]);
        break;
      case 1:
        subtitle = 'month';
        subject = this.financesService.toMoneyFormat(this.incomesPer[this.incomeIndex]);
        break;
      case 2:
        subtitle = 'day';
        subject = this.financesService.toMoneyFormat(this.incomesPer[this.incomeIndex]);
        break;
      default:
        this.incomeIndex = -1;
        this.changeCardIncome();
        return;
    }
    this.cards[0].subtitle = subtitle;
    this.cards[0].subject = subject;
  }
}
