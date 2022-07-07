import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMoralComponent } from './form-moral.component';

describe('FormMoralComponent', () => {
  let component: FormMoralComponent;
  let fixture: ComponentFixture<FormMoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMoralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
