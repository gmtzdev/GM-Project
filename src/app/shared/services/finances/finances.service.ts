import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatesService } from '../global/dates.service';
import { CategoryOptions } from '../../interfaces/finances/categoryOptions';

// Model
import { HttpResponse } from '../../models/http/HttpResponse.model';
import { Origin } from '../../models/origin.model';

// Dto
import { CreateBillDto } from '../../dto/create-bill.dto';
import { CreateIncomeDto } from '../../dto/create-icome.dto';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { CreateInstitutionDto } from '../../dto/create-institution.dto';
import { UpdateBillDto } from '../../dto/bill/update-bill.dto';
import { ContributionDto } from '../../dto/contribution/create-contribution.dto';

@Injectable({
  providedIn: 'root',
})
export class FinancesService {
  private URL: string = 'http://localhost:1612/finances';

  constructor(private http: HttpClient, private datesService: DatesService) {}

  // General
  public getBillsInFormat(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/getBillsInFormat`);
  }
  public getIncomesPer(): Observable<HttpResponse> {
    const date = this.datesService.getDate();
    return this.http.get<HttpResponse>(`${this.URL}/getIncomesPer/${date}`);
  }
  public getBillsPer(): Observable<HttpResponse> {
    const date = this.datesService.getDate();
    return this.http.get<HttpResponse>(`${this.URL}/getBillsPer/${date}`);
  }
  public getTopOneCategory(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/getTopOneCategory`);
  }
  public getIncomesVsBills(year: number): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/getIncomesVsBills/${year}`);
  }
  public getNoCompleteObjectives(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/getNoCompleteObjectives`);
  }
  public getIncomes(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/getIncomes`);
  }
  public getBills(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/getBills`);
  }
  public getCategoriesToGraphic(
    options: CategoryOptions
  ): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.URL}/getCategoriesToGraphic`, {
      options,
    });
  }

  public getNoCompleteDebts(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/getNoCompleteDebts`);
  }

  // Income
  public saveIncome(income: CreateIncomeDto): Observable<HttpResponse> {
    income = new CreateIncomeDto(
      income.concept,
      income.amount,
      income.origin,
      income.created_at
    );
    return this.http.post<HttpResponse>(`${this.URL}/income`, { income });
  }

  // Bill
  public saveBill(bill: CreateBillDto): Observable<HttpResponse> {
    bill = new CreateBillDto(bill);
    return this.http.post<HttpResponse>(`${this.URL}/bill`, { bill });
  }
  public getBill(id: number): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/bill/${id}`);
  }
  public updateBill(bill: UpdateBillDto): Observable<HttpResponse> {
    bill = new UpdateBillDto(bill);
    bill.updated_at = new Date(this.datesService.getNow());
    console.log(bill);
    return this.http.patch<HttpResponse>(`${this.URL}/bill/${bill.id}`, {
      bill,
    });
  }

  // Origin
  public getOrigins(): Observable<Origin[]> {
    return this.http.get<Origin[]>(`${this.URL}/origin`);
  }

  // Category
  public getCartegories(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/category`);
  }
  public saveCategory(category: CreateCategoryDto): Observable<HttpResponse> {
    category = new CreateCategoryDto(category.name);
    return this.http.post<HttpResponse>(`${this.URL}/category`, { category });
  }

  // Payment
  public getPayments(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/payment`);
  }

  // Institution
  public getInstitutions(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/institution`);
  }
  public saveInstitution(
    institution: CreateInstitutionDto
  ): Observable<HttpResponse> {
    institution = new CreateInstitutionDto(institution.name);
    return this.http.post<HttpResponse>(`${this.URL}/institution`, {
      institution,
    });
  }

  // Card
  public getCards(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/card`);
  }

  // Contribution
  public saveContribution(
    contribution: ContributionDto
  ): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(
      `${this.URL}/contribution`,
      contribution
    );
  }

  // Utils
  public toMoneyFormat(amount: number): string {
    const a = amount.toString();
    let aux: string[] = [];
    let money: string = '$';
    const long: number = a.length;
    const includesPoint: boolean = a.includes('.');

    let i = 1;
    if (includesPoint)
      for (i = 1; i <= long; i++) {
        aux.push(a[long - i]);
        if (a[long - i] == '.') {
          i++;
          break;
        }
      }

    for (let j = i; j <= long; j++) {
      aux.push(a[long - j]);
      if ((j - i + 1) % 3 === 0 && j + 1 <= long) aux.push(',');
    }

    aux = aux.reverse();
    money += aux.join('');
    return money;
  }
}
