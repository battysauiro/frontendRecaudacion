import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribucionDerechoGComponent } from './contribucion-derecho-g.component';

describe('ContribucionDerechoGComponent', () => {
  let component: ContribucionDerechoGComponent;
  let fixture: ComponentFixture<ContribucionDerechoGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribucionDerechoGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribucionDerechoGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
