import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  week = [
    {day:'Monday', con:'mo'}, 
    {day: 'Thesday', con: 'th'}, 
    {day: 'Wendsday', con: 'we'}, 
    {day: 'Thersday', con: 'th'}, 
    {day: 'Friday', con: 'fr'}, 
    {day: 'Saturday', con: 'sa'}, 
    {day: 'Sunday', con: 'su'}
  ];
  items = [
    1,2,3,4,5,6,7,
    8,9,10,11,12,13,14,
    15,16,17,18,19,20,21,
    22,23,24,25,26,27,28,
    29,30,31,3,4,5,6,
  ]
}
