import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputErrorComponent } from './text-input-error.component';
import { FormControl, Validators } from '@angular/forms';

describe('TextInputErrorComponent', () => {
  let component: TextInputErrorComponent;
  let fixture: ComponentFixture<TextInputErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInputErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextInputErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display required error message', () => {
    component.control = new FormControl('', Validators.required);
    component.label = 'Email';
    component.ngOnInit();
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorElement: HTMLElement =
      fixture.nativeElement.querySelector('.error');
    expect(errorElement.textContent).toContain('Email is required');
  });
});
