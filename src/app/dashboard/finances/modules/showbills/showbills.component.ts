import { Component } from '@angular/core';
import { FinancesService } from '../../../../shared/services/finances/finances.service';
import { HttpResponse } from '../../../../shared/models/http/HttpResponse.model';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../../../shared/models/database/Card.model';
import { Payment } from '../../../../shared/models/database/Payment.model';
import { BillToTable } from '../../../../shared/models/database/BillToTable.model';
import { Router } from '@angular/router';
import { Institution } from '../../../../shared/models/database/Institution.model';

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

  selectedCustomers!: Customer[];

  representatives!: Representative[];
  cards!: Card[];

  payments!: { id: number; name: string }[];
  paymentsOptions: string[] = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

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

    this.financesServices
      .getPayments()
      .subscribe((responsePayments: Payment[]) => {
        this.payments = responsePayments;
        this.payments.forEach((payment) => {
          this.paymentsOptions.push(payment.name);
        });
      });

    this.financesServices.getInstitutions().subscribe({
      next: (responseInstitutions: Institution[]) => {
        console.log('Si responde');
        console.log(responseInstitutions);
      },
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

  public getSeverity(status: string | number): string {
    return typeof status === 'string'
      ? this.getSeverityByName(status)
      : this.getSeverityById(status);
  }
  public getSeverityByName(status: string): string {
    switch (status) {
      case 'Efectivo':
        return 'success';
      case 'Tarjeta de debito':
        return 'info';
      case 'Tarjeta de credito':
        return '';
      default:
        return 'danger';
    }
  }
  public getSeverityById(status: number): string {
    switch (status) {
      case 1:
        return 'success';
      case 2:
        return 'info';
      case 3:
        return '';
      default:
        return 'danger';
    }
  }

  public editBill(id: number) {
    this.router.navigate(['finances', 'editBills', id]);
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
