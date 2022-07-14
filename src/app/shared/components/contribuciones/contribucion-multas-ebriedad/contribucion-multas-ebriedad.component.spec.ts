import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribucionMultasEbriedadComponent } from './contribucion-multas-ebriedad.component';

describe('ContribucionMultasEbriedadComponent', () => {
  let component: ContribucionMultasEbriedadComponent;
  let fixture: ComponentFixture<ContribucionMultasEbriedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribucionMultasEbriedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribucionMultasEbriedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
