import { Pipe, PipeTransform } from '@angular/core';
import { FinancesService } from '../services/finances/finances.service';

@Pipe({
  name: 'MoneyFormat',
  // pure: true,
  standalone: true,
})
export class MoneyFormatPipe implements PipeTransform {
  constructor(private financesService: FinancesService) {}

  transform(amount: number): string {
    return this.financesService.toMoneyFormat(amount);
  }
}