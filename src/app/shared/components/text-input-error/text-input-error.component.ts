import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-text-input-error',
  templateUrl: './text-input-error.component.html',
})
export class TextInputErrorComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  @Input() public control: AbstractControl | null = null;
  @Input() public label = '';

  public errorMessages = signal<string[]>([]);

  public ngOnInit(): void {
    if (!this.control) {
      return;
    }
    this.control.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateErrorMessages();
      });
    this.updateErrorMessages();
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

    const messages = Object.keys(errors).map(
      (errorKey) =>
        errorMessagesMap[errorKey] ||
        `${this.label} has an unknown error: ${errorKey}`,
    );

    this.errorMessages.set(messages);
  }
}
