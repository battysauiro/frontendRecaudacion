import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAdeudosComponent } from './vista-adeudos.component';

describe('VistaAdeudosComponent', () => {
  let component: VistaAdeudosComponent;
  let fixture: ComponentFixture<VistaAdeudosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaAdeudosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaAdeudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
