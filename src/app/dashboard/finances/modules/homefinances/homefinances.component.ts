import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CardComponent } from '../../components/card/card.component';
import { IncomesyearComponent } from '../../components/incomesyear/incomesyear.component';
import { ObjetivesComponent } from '../../components/objetives/objetives.component';
import { BillscategoryComponent } from '../../components/billscategory/billscategory.component';
import { BillsgraphicComponent } from '../../components/billsgraphic/billsgraphic.component';
import { CardHome } from '../../core/models/CardHome.model';
import { FinancesService } from '../../core/services/finances.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { DebtsComponent } from '../../components/debts/debts.component';

@Component({
  selector: 'app-homefinances',
  standalone: true,
  imports: [
    CardComponent,
    IncomesyearComponent,
    ObjetivesComponent,
    BillscategoryComponent,
    BillsgraphicComponent,
    DebtsComponent,

    NgxChartsModule,
  ],
  templateUrl: './homefinances.component.html',
  styleUrl: './homefinances.component.scss',
})
export class HomefinancesComponent implements OnInit {
  private incomeIndex = 0;
  private billIndex = 0;
  public incomesPer: number[] = [];
  public billsPer: number[] = [];

  public cards: CardHome[] = [
    {
      id: 1,
      icon: 'fa-sack-dollar',
      destination: 'finances/addIncome',
      title: 'Incomes',
      subtitle: 'year',
      subject: '$0',
    },
    {
      id: 2,
      icon: 'fa-circle-dollar-to-slot',
      destination: 'finances/addBill',
      title: 'Bills',
      subtitle: 'year',
      subject: '$0',
    },
    {
      id: 3,
      icon: 'fa-cart-shopping',
      destination: '',
      title: 'Top Category',
      subtitle: '',
      subject: '',
    },
    {
      id: 4,
      icon: 'fa-credit-card',
      destination: '',
      title: 'Pay at',
      subtitle: '',
      subject: '50 days',
    },
  ];

  constructor(
    private financesService: FinancesService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const incomesPer = await lastValueFrom(
      this.financesService.getIncomesPer()
    );
    if (incomesPer.success) {
      this.incomesPer = incomesPer.data.incomesPer;
      this.cards[0].subject = this.financesService.toMoneyFormat(
        this.incomesPer[this.incomeIndex]
      );
    }
    const billPer = await lastValueFrom(this.financesService.getBillsPer());
    console.log(billPer);
    if (billPer.success) {
      this.billsPer = billPer.data.billsPer;
      this.cards[1].subject = this.financesService.toMoneyFormat(
        this.billsPer[this.billIndex]
      );
    }
    const TopOneCategoryResponse = await lastValueFrom(
      this.financesService.getTopOneCategory()
    );
    if (TopOneCategoryResponse.success) {
      this.cards[2].subject = TopOneCategoryResponse.data.category;
    }
  }

  public showDetails(id: number) {
    switch (id) {
      case 1:
        this.showIncomes();
        break;
      case 2:
        this.showBills();
        break;
    }
  }
  public changeCard(id: number) {
    switch (id) {
      case 1:
        this.changeCardIncome();
        break;
      case 2:
        this.changeCardBill();
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
        subject = this.financesService.toMoneyFormat(
          this.incomesPer[this.incomeIndex]
        );
        break;
      case 1:
        subtitle = 'month';
        subject = this.financesService.toMoneyFormat(
          this.incomesPer[this.incomeIndex]
        );
        break;
      case 2:
        subtitle = 'day';
        subject = this.financesService.toMoneyFormat(
          this.incomesPer[this.incomeIndex]
        );
        break;
      default:
        this.incomeIndex = -1;
        this.changeCardIncome();
        return;
    }
    this.cards[0].subtitle = subtitle;
    this.cards[0].subject = subject;
  }
  private changeCardBill() {
    let subtitle: string;
    let subject: string;
    this.billIndex++;
    switch (this.billIndex) {
      case 0:
        subtitle = 'year';
        subject = this.financesService.toMoneyFormat(
          this.billsPer[this.billIndex]
        );
        break;
      case 1:
        subtitle = 'month';
        subject = this.financesService.toMoneyFormat(
          this.billsPer[this.billIndex]
        );
        break;
      case 2:
        subtitle = 'day';
        subject = this.financesService.toMoneyFormat(
          this.billsPer[this.billIndex]
        );
        break;
      default:
        this.billIndex = -1;
        this.changeCardBill();
        return;
    }
    this.cards[1].subtitle = subtitle;
    this.cards[1].subject = subject;
  }
  private showIncomes() {
    this.router.navigate([this.router.url, 'showIncomes']);
  }
  private showBills() {
    this.router.navigate([this.router.url, 'showBills']);
  }
}
