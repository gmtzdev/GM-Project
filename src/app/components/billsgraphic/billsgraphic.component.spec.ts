import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsgraphicComponent } from './billsgraphic.component';

describe('BillsgraphicComponent', () => {
  let component: BillsgraphicComponent;
  let fixture: ComponentFixture<BillsgraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillsgraphicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillsgraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
