import { Component } from '@angular/core';
import { FinancesService } from '../../core/services/finances.service';
import { HttpResponse } from '../../../../shared/models/http/HttpResponse.model';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { Tag, TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../core/models/database/Card.model';
import { Payment } from '../../core/models/database/Payment.model';
import { BillToTable } from '../../core/models/BillToTable.model';
import { Router } from '@angular/router';
import { Institution } from '../../core/models/database/Institution.model';
import { Bill } from '../../core/models/database/Bill.model';

@Component({
  selector: 'app-showbills',
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
  templateUrl: './showbills.component.html',
  styleUrls: [
    './showbills.component.scss',
    '/src/app/shared/styles/gm-primeng-table.scss',
  ],
})
export class ShowbillsComponent {
  bills!: BillToTable[];
  selectedBills!: Bill[];
  institutions!: Institution[];
  cards!: Card[];
  payments!: { id: number; name: string }[];
  paymentsOptions: string[] = [];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  public globalFilterOptions: string[] = [
    'concept',
    'amount',
    'institution.name',
    'paymentColumn',
    'card.name',
  ];
  public globalFilter: string = '';
  public payMethod!: string;

  constructor(
    private readonly financesServices: FinancesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.financesServices
      .getBills()
      .subscribe((responseBills: HttpResponse) => {
        this.bills = responseBills.data as BillToTable[];
        this.loading = false;
        this.bills.forEach((bill) => {
          bill.created_at = new Date(<Date>bill.created_at);
          bill.paymentColumn = bill.payment.name;
        });
      });

    this.financesServices.getPayments().subscribe({
      next: (responsePayments: HttpResponse) => {
        if (!responsePayments.success) {
          // Error
          return;
        }
        this.payments = responsePayments.data as Payment[];
        this.payments.forEach((payment) => {
          this.paymentsOptions.push(payment.name);
        });
      },
    });

    this.financesServices.getInstitutions().subscribe({
      next: (responseInstitutions: HttpResponse) => {
        this.institutions = responseInstitutions.data as Institution[];
      },
    });

    this.cards = [
      {
        id: 3,
        name: 'BBVA Azul',
        owner: 1,
        reference: '4006',
        type: 2,
        sequence: 1,
      },
      {
        id: 2,
        name: 'BBVA Débito',
        owner: 1,
        reference: '9002',
        type: 2,
        sequence: 2,
      },
      {
        id: 1,
        name: 'Efectivo',
        owner: 1,
        reference: '',
        type: 1,
        sequence: 3,
      },
    ];
  }

  public getSeverity(status: string | number): Tag['severity'] {
    return typeof status === 'string'
      ? this.getSeverityByName(status)
      : this.getSeverityById(status);
  }
  public getSeverityByName(status: string): Tag['severity'] {
    switch (status) {
      case 'Efectivo':
        return 'success';
      case 'Tarjeta de debito':
        return 'info';
      case 'Tarjeta de credito':
        return undefined;
      default:
        return 'danger';
    }
  }
  public getSeverityById(status: number): Tag['severity'] {
    switch (status) {
      case 1:
        return 'success';
      case 2:
        return 'info';
      case 3:
        return undefined;
      default:
        return 'danger';
    }
  }

  public editBill(id: number) {
    this.router.navigate(['finances', 'editBills', id]);
  }
}
