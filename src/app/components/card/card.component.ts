import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardHome } from '../../shared/models/CardHome.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      <div class="header-card">
        <i class="fa-solid {{card.icon}} icon" (click)="iconClick()"></i>

        <button class="btn" (click)="navigate(card.destination)" [hidden]="card.destination == ''">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>

      <div class="title">
        <span (click)="titleClick()">{{card.title}}</span>
      </div>

      <div class="subject">
        <span>{{card.subject}}</span> <span>{{card.subtitle}}</span>
      </div>
    </div>
  `,
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card: CardHome = { id: 0, icon: '', destination: '', title: '', subtitle: '', subject: '' };
  @Output() onIconClicked = new EventEmitter<number>();
  @Output() onTitleClicked = new EventEmitter<number>();

  constructor(
    private router: Router
  ) { }

  navigate(destination: string) {
    this.router.navigate([destination])
  }

  public iconClick(){
    this.onIconClicked.emit(this.card.id);
  }

  public titleClick(){
    this.onTitleClicked.emit(this.card.id);
  }

}
