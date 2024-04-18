import { Component, OnInit } from '@angular/core';
import { DatesService } from '../../shared/services/global/dates.service';
import { DaysOfWeek } from '../../shared/enum/DaysOfWeek.enum';
import { CommonModule } from '@angular/common';
import { Day } from '../../shared/models/calendar/Day.model';
import { DateModalService } from '../../shared/services/modals/date-modal.service';
import { TaskService } from '../../shared/services/global/task.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  week = [
    { day: 'Sunday', con: 'su' },
    { day: 'Monday', con: 'mo' },
    { day: 'Thesday', con: 'th' },
    { day: 'Wendsday', con: 'we' },
    { day: 'Thersday', con: 'th' },
    { day: 'Friday', con: 'fr' },
    { day: 'Saturday', con: 'sa' }
  ];
  items: Day[] = [];

  constructor(
    private datesService: DatesService,
    private taskService: TaskService,
    private dateModalService: DateModalService
  ) { }

  public today: Date = new Date(this.datesService.getNow());
  public year: string = '';
  public month: string = '';
  public day: number = 0;


  ngOnInit(): void {
    this.day = this.today.getDate();
    this.month = this.today.toLocaleString('es-MX', { month: 'long' });
    this.year = this.today.getFullYear().toString();

    const firstDayOfMonth = new Date(`${this.year}-${this.today.getMonth() + 1}-01 12:00:00`);
    const previousMonth = new Date(+(this.year), this.today.getMonth(), 0);

    let y = previousMonth.getDate();
    for (let x = firstDayOfMonth.getDay() - 1; x >= 0; x--, y--) {
      let day = new Day(y);
      day.noDayOfMonth = true;
      this.items.push(day);
    }

    this.items = this.items.reverse();

    let j = 1;
    let i = firstDayOfMonth.getDay();
    for (; j <= this.datesService.getDaysOfMonth(this.today); i++, j++) {
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

    setTimeout(() => {
      this.taskService.setDay.emit(`${this.day} ${this.month.slice(0, 3)}`);
    }, 500);
  }

  public insertTask($event: any, day: number, noDayOfMonth: boolean) {
    let month = this.month;
    if(noDayOfMonth){
      let swap = (day < 15) ? 1 : -1;
      const Month = new Date(+(this.year), this.today.getMonth() + swap, 15);
      month = Month.toLocaleString('es-MX', { month: 'long' });
    }
    this.taskService.setDay.emit(`${day} ${month.slice(0, 3)}`);
    this.dateModalService.animationEmitter.emit({ x: $event.x, y: $event.y, day: day });
  }
}
