import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribucionMultasComponent } from './contribucion-multas.component';

describe('ContribucionMultasComponent', () => {
  let component: ContribucionMultasComponent;
  let fixture: ComponentFixture<ContribucionMultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribucionMultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribucionMultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
