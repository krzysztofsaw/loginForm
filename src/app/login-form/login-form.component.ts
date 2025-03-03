import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TextInputErrorComponent } from '../shared/components/text-input-error/text-input-error.component';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, TextInputErrorComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public loginFailed = signal<boolean>(false);

  public loginForm = this.fb.group({
    email: new FormControl<string>('', [
      Validators.required,
      this.emailValidator,
    ]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const valid = emailPattern.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (email && password) {
        this.authService.login(email, password).subscribe((userExists) => {
          if (!userExists) {
            this.loginFailed.set(true);
          }
        });
      }
    }
  }
}
