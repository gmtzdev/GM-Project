import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavItem } from '../../models/navitem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private URL: string = 'http://localhost:1612';

  constructor(
    private http: HttpClient
  ) { }

  public getNavItems(): Observable<NavItem[]> {
    return this.http.get<NavItem[]>(`${this.URL}/navitem`);
  }
}
