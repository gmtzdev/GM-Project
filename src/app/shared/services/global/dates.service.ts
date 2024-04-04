import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  public getDate(): string {
    let date: string = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/ /g, "").slice(0, 10).replaceAll('.', '-');
    return date;
  }

  public getNow() {
    let newToday:string = this.getDate();
    let date = new Date();
    let localTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    return `${newToday} ${localTime}`;
  }
}
