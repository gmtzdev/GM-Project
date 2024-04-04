import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FinancesService } from '../../../../shared/services/finances/finances.service';
import { Location } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { Institution } from '../../../../shared/models/database/Institution.model';
import { Category } from '../../../../shared/models/database/Category.model';
import { Payment } from '../../../../shared/models/database/Payment.model';
import { Router } from '@angular/router';
import { Card } from '../../../../shared/models/database/Card.model';
import { BankCardComponent } from '../../../../components/utils/bank-card/bank-card.component';
import { SuccessModal } from '../../../../shared/classes/modals/SuccessModal';
import { ErrorModal } from '../../../../shared/classes/modals/ErrorModal';

@Component({
  selector: 'app-addbill',
  standalone: true,
  imports: [ReactiveFormsModule, AutocompleteLibModule, BankCardComponent],
  templateUrl: './addbill.component.html',
  styleUrl: './addbill.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddbillComponent implements OnInit {
  public categories: Category[] = [];
  public payments: Payment[] = [];
  public institutions: Institution[] = [];
  public cards: Card[] = [];
  keyword: string = 'name';

  public addBill: FormGroup = new FormGroup({
    'concept': new FormControl('', Validators.required),
    'amount': new FormControl('', Validators.required),
    'category': new FormControl('', Validators.required),
    'payment': new FormControl('', Validators.required),
    'card': new FormControl('', Validators.required),
    'institution': new FormControl('', Validators.required),
  });

  constructor(
    private financesService: FinancesService,
    private location: Location,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const inputs = document.querySelectorAll('.input');
    function addFocus(this: any) {
      let parent = this.parentNode;
      parent.classList.add("focus");
    }
    function removeFocus(this: any) {
      let parent = this.parentNode;
      if (this.value == "") {
        parent.classList.remove("focus");
      }
    }
    inputs.forEach(input => {
      input.addEventListener("focus", addFocus);
      input.addEventListener("blur", removeFocus);
    });
    function animateBtn(this: any) {
      this.classList.add('animate');
      setTimeout(() => {
        this.classList.remove('animate');
      }, 600);
    }
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
      btn.addEventListener("click", animateBtn);
    })

    await this.initializer()
  }

  async initializer() {
    const resCategory = await lastValueFrom(this.financesService.getCartegories());
    if (resCategory.length != 0) {
      this.categories = resCategory;
    }
    const resPayment = await lastValueFrom(this.financesService.getPayments());
    if (resPayment.length != 0) {
      this.payments = resPayment;
    }
    const resInstitution = await lastValueFrom(this.financesService.getInstitutions());
    if (resInstitution.length != 0) {
      this.institutions = resInstitution;
    }
    const resCard = await lastValueFrom(this.financesService.getCards());
    if (resCard.length != 0) {
      this.cards = resCard;
    }
  }

  selectEventPayment($event: any) {
    const swiper = document.querySelector('swiper-container');
    if ($event.id == 1)
      swiper?.swiper.slideTo(2);
    if ($event.id == 2)
      swiper?.swiper.slideTo(1);
    if ($event.id == 3)
      swiper?.swiper.slideTo(0);
  }

  selectEvent($event: any) {
    console.log($event)
  }

  onChangeSearch($event: any) { }
  onFocused(id: string) {
    id = `ng-autocomplete-${id}`;
    const label = document.getElementById(id) as HTMLDivElement;
    label.classList.add('focus');
  }
  onClosed(id: string) {
    this.dynamicVerify(id);
    let id_label = `ng-autocomplete-${id}`;
    const label = document.getElementById(id_label) as HTMLDivElement;
    if (this.addBill.controls[id].value == "")
      label.classList.remove('focus');
  }

  public cancel() {
    setTimeout(() => {
      this.location.back();
    }, 500)
  }
  public async saveBill() {
    const btnSave = document.getElementById('saveBill') as HTMLButtonElement;
    btnSave.disabled = true;

    const cards = document.querySelectorAll('swiper-slide');
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].classList.contains('swiper-slide-active')) {
        this.addBill.controls['card'].setValue(this.cards[i])
      }
    }

    if (!this.addBill.valid) {
      ErrorModal.Center.fire({ 'title': 'Invalid form' });
      this.showInvalids();
      btnSave.disabled = false;
      return;
    }

    const result = await lastValueFrom(this.financesService.saveBill(this.addBill.value));
    if (!result.success) {
      alert('Error');
      return;
    }
    setTimeout(() => {
      SuccessModal.TopEnd.fire({ title: 'Bill saved successfully' });
      this.resetForm();
      btnSave.disabled = false;
    }, 500);
  }
  private resetForm() {
    this.addBill.reset();
    const inputs = document.querySelectorAll('.input') as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < inputs.length; i++) {
      let parent = inputs[i].parentNode as HTMLDivElement;
      if (inputs[i].value == "") {
        parent.classList.remove("focus");
      }
    }
    this.onClosed('origin');
  }
  private showInvalids() {
    for (const input in this.addBill.controls) {
      const formControl = this.addBill.get(input);
      const htmlInput = document.getElementById(input) as HTMLElement;
      if (htmlInput) {
        if (!formControl?.valid) {
          htmlInput.style.boxShadow = '5px 5px 5px rgba(215, 34, 68, 0.88)';
        } else {
          htmlInput.style.boxShadow = 'none';
        }
      }
    }
  }
  public dynamicVerify(controlName: string): void {
    const htmlInput = document.getElementById(controlName) as HTMLElement;
    if (htmlInput) {
      if (!this.addBill.controls[controlName].valid) {
        htmlInput.style.boxShadow = '5px 5px 5px rgba(215, 34, 68, 0.88)';
      } else {
        htmlInput.style.boxShadow = 'none';
      }
    }
  }

  public addCategory() {
    this.router.navigate(['addCategory'])
  }
}
