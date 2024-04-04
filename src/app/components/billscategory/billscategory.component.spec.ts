import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillscategoryComponent } from './billscategory.component';

describe('BillscategoryComponent', () => {
  let component: BillscategoryComponent;
  let fixture: ComponentFixture<BillscategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillscategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillscategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
