import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryTask } from '../models/database/CategotyTask.model';
import { HttpResponse } from '../../../../shared/models/http/HttpResponse.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly URL = `http://localhost:1612/productivity/category-task`;

  constructor(public readonly http: HttpClient) {}

  public getAllCategories(): Observable<CategoryTask[]> {
    return this.http.get<HttpResponse>(this.URL).pipe(
      map((response: HttpResponse) => {
        return response.data;
      })
    );
  }
}
