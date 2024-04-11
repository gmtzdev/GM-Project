import { Component, OnInit } from '@angular/core';
import { CardHome } from '../../shared/models/CardHome.model';
import { CardComponent } from '../../components/card/card.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IncomesyearComponent } from '../../components/incomesyear/incomesyear.component';
import { BillscategoryComponent } from '../../components/billscategory/billscategory.component';
import { BillsgraphicComponent } from '../../components/billsgraphic/billsgraphic.component';
import { ObjetivesComponent } from '../../components/objetives/objetives.component';
import { FinancesService } from '../../shared/services/finances/finances.service';
import { lastValueFrom } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [
    RouterOutlet],
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.scss'
})
export class FinancesComponent {
  
}
