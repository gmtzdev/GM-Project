import { Component, OnInit } from '@angular/core';
import { DatesService } from '../../shared/services/global/dates.service';
import { DaysOfWeek } from '../../shared/enum/DaysOfWeek.enum';
import { CommonModule } from '@angular/common';
import { Day } from '../../shared/models/calendar/Day.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  week = [
    { day: 'Sun,day', con: 'su' },
    { day: 'Monday', con: 'mo' },
    { day: 'Thesday', con: 'th' },
    { day: 'Wendsday', con: 'we' },
    { day: 'Thersday', con: 'th' },
    { day: 'Friday', con: 'fr' },
    { day: 'Saturday', con: 'sa' }
  ];
  items: Day[] = [];

  constructor(
    private datesService: DatesService
  ) { }

  public year: string = '';
  public month: string = '';
  public day: number = 0;


  ngOnInit(): void {
    const today = new Date(this.datesService.getNow());

    this.day = today.getDate();
    this.month = today.toLocaleString('es-MX', { month: 'long' });
    this.year = today.getFullYear().toString();

    const firstDayOfMonth = new Date(`${this.year}-${today.getMonth() + 1}-01 12:00:00`);
    const previousMonth = new Date(+(this.year), today.getMonth(), 0);

    let y = previousMonth.getDate();
    for (let x = firstDayOfMonth.getDay() - 1; x >= 0; x--, y--) {
      let day = new Day(y);
      day.noDayOfMonth = true;
      this.items.push(day);
    }

    this.items = this.items.reverse();

    let j = 1;
    let i = firstDayOfMonth.getDay();
    for (; j <= this.datesService.getDaysOfMonth(today); i++, j++) {
      let day = new Day(j);
      if (day.day == this.day) {
        day.today = true;
      }
      this.items.push(day);
    }

    let a = 1;
    for (; i < 35; i++, a++) {
      let day = new Day(a);
      day.noDayOfMonth = true;
      this.items.push(day)
    }

  }


}
