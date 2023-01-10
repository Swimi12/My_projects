import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { InputTypes } from '../types/input.types';
import { Language } from '../types/language.types';
import { AutorizationService } from './autorization.service';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatFormFieldModule,
  ],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  providers: [AutorizationService],
})
export default class AuthorizationComponent {
  form!: FormGroup;
  InputTypes = InputTypes;
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly autorizationService: AutorizationService,
    private readonly translateService: TranslateService,
    private readonly router: Router,
    private readonly authGuard: AuthGuard,
    private _snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.autorizationService
        .authorization(
          this.form.value,
          this.translateService.currentLang as Language
        )
        .subscribe({
          next: (response) => {
            this.form.enable();
            this.initForm();
            this.authGuard.isAuthenticate = response.succes;
            this.router.navigateByUrl('/admin');
          },
          error: (errorResponse) => {
            this.form.enable();
            this.readErrors(errorResponse.error.errors);
          },
        });
    }
  }

  // * Helpers for view
  readErrors(errors: ValidationErrors) {
    Object.keys(errors).forEach((k) => {
      this.openSnackBarErrors(errors[k]);
    });
    this.loading = false;
    this.form.enable();
  }

  openSnackBarErrors(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  isControlValid(controlName: string) {
    const control = this.form.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string) {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }
}
