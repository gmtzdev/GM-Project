import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavItem } from '../../models/navitem.model';
import { Origin } from '../../models/origin.model';
import { Observable } from 'rxjs';
import { CreateIncomeDto } from '../../dto/create-icome.dto';
import { DatesService } from '../global/dates.service';
import { CreateBillDto } from '../../dto/create-bill.dto';
import { Category } from '../../models/database/Category.model';
import { Payment } from '../../models/database/Payment.model';
import { Institution } from '../../models/database/Institution.model';
import { Card } from '../../models/database/Card.model';
import { HttpResponse } from '../../models/http/HttpResponse.model';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { CreateInstitutionDto } from '../../dto/create-institution.dto';

@Injectable({
  providedIn: 'root'
})
export class FinancesService {

  private URL: string = 'http://localhost:1612';
  private URLFinances: string = `${this.URL}/finances`

  constructor(
    private http: HttpClient,
    private datesService: DatesService
  ) { }

  // General
  public getBillsInFormat(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URLFinances}/getBillsInFormat`);
  }
  public getIncomesPer(): Observable<HttpResponse> {
    let date = this.datesService.getDate();
    return this.http.get<HttpResponse>(`${this.URLFinances}/getIncomesPer/${date}`);
  }
  public getBillsPer(): Observable<HttpResponse> {
    let date = this.datesService.getDate();
    return this.http.get<HttpResponse>(`${this.URLFinances}/getBillsPer/${date}`);
  }
  public getTopOneCategory(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URLFinances}/getTopOneCategory`);
  }
  public getIncomesVsBills(year: number): any {
    return this.http.get<NavItem[]>(`${this.URLFinances}/getIncomesVsBills/${year}`);
  }

  // Income
  saveIncome(income: CreateIncomeDto): Observable<HttpResponse> {
    income = new CreateIncomeDto(income.concept, income.amount, income.origin);
    return this.http.post<HttpResponse>(`${this.URL}/income`, { income });
  }

  saveBill(bill: CreateBillDto): Observable<HttpResponse> {
    bill = new CreateBillDto(bill);
    return this.http.post<HttpResponse>(`${this.URL}/bill`, { bill });
  }

  // Origin
  public getOrigins(): Observable<Origin[]> {
    return this.http.get<Origin[]>(`${this.URL}/origin`);
  }

  // Category
  public getCartegories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }
  public saveCategory(category: CreateCategoryDto): Observable<HttpResponse> {
    category = new CreateCategoryDto(category.name);
    return this.http.post<HttpResponse>(`${this.URL}/category`, { category });
  }

  // Payment
  public getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.URL}/payment`);
  }

  // Institution
  public getInstitutions(): Observable<Institution[]> {
    return this.http.get<Institution[]>(`${this.URL}/institution`);
  }
  public saveInstitution(institution: CreateInstitutionDto): Observable<HttpResponse> {
    institution = new CreateInstitutionDto(institution.name);
    return this.http.post<HttpResponse>(`${this.URL}/institution`, { institution });
  }


  // Card
  public getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.URL}/card`);
  }

  // Utils
  public toMoneyFormat(amount: number): string {
    let a = amount.toString();
    let aux: string[] = [];
    let money: string = '$';
    let long: number = a.length;
    let includesPoint: boolean = a.includes('.');

    let i = 1
    if (includesPoint)
      for (i = 1; i <= long; i++) {
        aux.push(a[long - i]);
        if (a[long - i] == '.') { i++; break };
      }

    for (let j = i; j <= long; j++) {
      aux.push(a[long - j]);
      if ((j - i + 1) % 3 === 0 && (j + 1) <= long) aux.push(',')
    }

    aux = aux.reverse();
    money += aux.join('');
    return money;
  }
}
