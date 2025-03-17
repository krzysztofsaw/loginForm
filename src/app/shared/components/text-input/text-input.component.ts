import { Component, forwardRef, Input, OnInit, signal } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  private destroyRef: DestroyRef = inject(DestroyRef);

  @Input() public label = '';
  @Input() public type = 'text';
  @Input() public placeholder = '';
  @Input() public control: AbstractControl | null = null;

  public errorMessages = signal<string[]>([]);

  public value = '';
  public disabled = false;

  private onChange: (value: string) => void = () => {
    return;
  };
  private onTouched: () => void = () => {
    return;
  };

  public ngOnInit(): void {
    if (this.control) {
      this.control.statusChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.updateErrorMessages();
        });
      this.updateErrorMessages();
    }
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  private updateErrorMessages(): void {
    const errors: ValidationErrors | null | undefined = this.control?.errors;
    if (!errors) {
      this.errorMessages.set([]);
      return;
    }

    const errorMessagesMap: Record<string, string> = {
      required: `${this.label} is required`,
      invalidEmail: `Invalid ${this.label.toLowerCase()} address`,
    };

    this.errorMessages.set(
      Object.keys(errors).map(
        (errorKey) =>
          errorMessagesMap[errorKey] ||
          `${this.label} has an unknown error: ${errorKey}`,
      ),
    );
  }
}
