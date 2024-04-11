import { Routes } from '@angular/router';
import { MainComponent } from './dashboard/main/main.component';
import { HomeComponent } from './dashboard/home/home.component';
import { FinancesComponent } from './dashboard/finances/finances.component';
import { AddincomeComponent } from './dashboard/finances/modules/addincome/addincome.component';
import { AddbillComponent } from './dashboard/finances/modules/addbill/addbill.component';
import { AddcategoryComponent } from './dashboard/finances/modules/addcategory/addcategory.component';
import { AddinstitutionComponent } from './dashboard/finances/modules/addinstitution/addinstitution.component';
import { AddbankcardComponent } from './dashboard/finances/modules/addbankcard/addbankcard.component';
import { HomefinancesComponent } from './dashboard/finances/modules/homefinances/homefinances.component';

export const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', component: HomeComponent },
            {
                path: 'finances', component: FinancesComponent, children: [
                    { path: '', component: HomefinancesComponent },
                    { path: 'addIncome', component: AddincomeComponent },
                    { path: 'addBill', component: AddbillComponent },
                    { path: 'addCategory', component: AddcategoryComponent },
                    { path: 'addInstitution', component: AddinstitutionComponent },
                    { path: 'addCard', component: AddbankcardComponent },
                ]
            },
        ]
    }
];
