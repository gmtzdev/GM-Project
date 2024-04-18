import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateModalService } from './shared/services/modals/date-modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'gm-project';


  @ViewChild('ModalDateWrap', { static: true }) ModalDateWrap: ElementRef | any;
  public wrap: any;
  public modalWrap: any;
  public blur: any;
  public animation: any;
  public iterations: number = 1;


  constructor(
    private dateModalService: DateModalService
  ) { }

  ngOnInit(): void {
    this.wrap = document.getElementById('wrap') as HTMLDivElement;
    this.modalWrap = this.wrap.children[0] as HTMLDivElement;
    this.blur = document.getElementById('blur') as HTMLDivElement;
    this.animation = this.modalWrap.animate([{ top: '50%', left: '50%', opacity: '1', width: '600px', height: '350px' }],
      {
        duration: 300,
        fill: 'forwards',
        iterations: 1
      }
    );
    this.animation.pause();
    this.animation.reverse();



    this.dateModalService.animationEmitter.subscribe((data) => {
      const {x, y, day} = data;

      const modal = this.modalWrap.children[0] as HTMLDivElement;
      const number = (modal.children[0] as HTMLDivElement).children[0] as HTMLDivElement;
      number.innerHTML = day;

      // Open sreen
      this.wrap.style.height = '100vh';
      this.blur.classList.add('blur');

      // Put the modal into click target
      this.modalWrap.style.top = `${y}px`;
      this.modalWrap.style.left = `${x}px`;

      // Show modal
      this.modalWrap.classList.add('show');

      // Invert the animation
      this.animation.reverse();

      // Start Animation
      this.animation.play();

      // Rotate modal to show form
      setTimeout(() => {
        modal.classList.add('rotate');
      }, 400);
    });
  }


  public closeDateModal($event: any) {

    // If click is inside modal, no emit close modal
    if (this.ModalDateWrap.nativeElement.contains($event.target)) {
      return;
    }

    const wrap = document.getElementById('wrap') as HTMLDivElement;
    const modalWrap = wrap.children[0] as HTMLDivElement;
    const modal = modalWrap.children[0] as HTMLDivElement;

    // Remove the blur
    const blur = document.getElementById('blur') as HTMLDivElement;
    blur.classList.remove('blur');

    // Rotate modal
    modal.classList.remove('rotate');

    setTimeout(() => {

      this.animation.reverse();
      
      setTimeout(() => {

        
        modalWrap.classList.remove('show');
        // Wrap close
        wrap.style.height = '0px';

        modalWrap.style.top = `0px`;
        modalWrap.style.left = `0px`;
      }, 310);
    }, 600);
  }
}
