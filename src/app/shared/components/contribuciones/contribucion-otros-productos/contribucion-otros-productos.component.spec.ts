import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribucionOtrosProductosComponent } from './contribucion-otros-productos.component';

describe('ContribucionOtrosProductosComponent', () => {
  let component: ContribucionOtrosProductosComponent;
  let fixture: ComponentFixture<ContribucionOtrosProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribucionOtrosProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribucionOtrosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
