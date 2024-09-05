import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '../../models/http/HttpResponse.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private URL: string = 'http://localhost:1612';

  constructor(private http: HttpClient) {}

  public getNavItems(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.URL}/navitem`);
  }
}
