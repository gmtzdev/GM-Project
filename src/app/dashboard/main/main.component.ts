import { Component, OnInit } from '@angular/core';
import { NavitemComponent } from '../../components/navitem/navitem.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavItem } from '../../shared/models/navitem.model';
import { CalendarComponent } from '../../global/calendar/calendar.component';
import { TasksComponent } from '../../global/tasks/tasks.component';
import { WidgetsComponent } from '../../global/widgets/widgets.component';
import { GeneralService } from '../../shared/services/global/general.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    // Utils
    NavitemComponent,

    // Global
    CalendarComponent,
    TasksComponent,
    WidgetsComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  public collapse: boolean = false;
  public navitems: NavItem[] = [];

  constructor(
    private generalService: GeneralService
  ) { }

  public collapseVerticalMenu() {
    this.collapse = !this.collapse;
  }

  ngOnInit(): void {
    this.initializer();
  }

  public async initializer() {
    this.navitems = await lastValueFrom(this.generalService.getNavItems());
    this.navitems.forEach((n) => {
      if (n.route === '') {
        n.exact = true;
      }else{
        n.exact = false;
      }
    })
  }
}
