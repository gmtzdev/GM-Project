import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancesService } from '../../core/services/finances.service';
import { HttpResponse } from '../../../../shared/models/http/HttpResponse.model';
import { Income } from '../../core/models/database/Income.model';

@Component({
  selector: 'app-showincomes',
  standalone: true,
  imports: [
    TableModule,
    MultiSelectModule,
    DropdownModule,
    TagModule,
    SliderModule,
    ProgressBarModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './showincomes.component.html',
  styleUrls: [
    './showincomes.component.scss',
    '/src/app/shared/styles/gm-primeng-table.scss',
  ],
})
export class ShowincomesComponent implements OnInit {
  incomes!: Income[];

  selectedCustomers!: Customer[];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  public globalFilter: string = '';

  constructor(private financesServices: FinancesService) {}

  ngOnInit(): void {
    this.financesServices
      .getIncomes()
      .subscribe((responseIncomes: HttpResponse) => {
        console.log(responseIncomes);
        this.incomes = responseIncomes.data as Income[];
        this.loading = false;
        this.incomes.forEach(
          (income) => (income.created_at = new Date(<Date>income.created_at))
        );
      });

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' },
    ];
  }

  public getSeverity(status: string): string | undefined {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return undefined;
    }
    return undefined;
  }
}

interface Country {
  name?: string;
  code?: string;
}

interface Representative {
  name?: string;
  image?: string;
}

interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string | Date;
  status?: string;
  activity?: number;
  representative?: Representative;
  verified?: boolean;
  balance?: number;
}
