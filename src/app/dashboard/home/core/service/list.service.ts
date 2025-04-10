import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { List } from '../models/database/List.model';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../../../../shared/models/http/HttpResponse.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private readonly URL = `http://localhost:1612/productivity/list`;
  constructor(private http: HttpClient) {}

  public getAllList(): Observable<List[]> {
    return this.http.get<HttpResponse>(`${this.URL}`).pipe(
      map((response: HttpResponse) => {
        // TODO Implements message toast
        // if (!response.success) {}
        return response.data;
      })
    );
  }
}
