import { Component } from '@angular/core';
import { FinancesService } from '../../../../shared/services/finances/finances.service';
// import { Debt } from '../../../../shared/models/database/Debt.model';
import { DebtGraphComponent } from '../../utils/debt-graph/debt-graph.component';
import { HttpResponse } from '../../../../shared/models/http/HttpResponse.model';
import { Objective } from '../../../../shared/models/database/Objective.modal';

@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [DebtGraphComponent],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss',
})
export class DebtsComponent {
  public objectives: Objective[] = [];

  constructor(private financesService: FinancesService) {}

  async ngOnInit() {
    this.financesService.getNoCompleteDebts().subscribe({
      next: (response: HttpResponse) => {
        this.objectives = response.data;
      },
    });
  }
}
