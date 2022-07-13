import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribucionImpuestoComponent } from './contribucion-impuesto.component';

describe('ContribucionImpuestoComponent', () => {
  let component: ContribucionImpuestoComponent;
  let fixture: ComponentFixture<ContribucionImpuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribucionImpuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribucionImpuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
