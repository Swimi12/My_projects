import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelegramComponent } from './components/telegram/telegram.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { EmailSubscribeService } from './../../../../service/email-subscribe.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/types/language.types';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InputTypes } from '../../../../types/input.types';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-latets-news',
  standalone: true,
  templateUrl: './latets-news.component.html',
  styleUrls: ['./latets-news.component.scss'],
  imports: [
    CommonModule,
    TelegramComponent,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatFormFieldModule,
  ],
  providers: [EmailSubscribeService],
})
export class LatetsNewsComponent {
  form!: FormGroup;
  InputTypes = InputTypes;
  loading: boolean = false;
  language: Language = this.translateService.currentLang as Language;
  languageSubscription = this.translateService.onLangChange.subscribe(() => {
    this.language = this.translateService.currentLang as Language;
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly emailSubscribeService: EmailSubscribeService,
    private readonly translateService: TranslateService,
    private _snackBar: MatSnackBar
  ) {
    this.language;
    this.languageSubscription;
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  submit() {
    this.form.markAllAsTouched();
    console.log('this.form.value: ', this.form.value);
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.emailSubscribeService
        .registration(
          this.form.value,
          this.translateService.currentLang as Language
        )
        .subscribe({
          next: (response) => {
            this.form.enable();
            this.initForm();
            this.loading = false;
            this.openSnackBar();
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
      this.openSnackBarErrors(errors[k][this.language]);
    });
    this.loading = false;
    this.form.enable();
  }

  openSnackBarErrors(message: string) {
    this._snackBar.open(
      message,
      this.translateService.instant('snack-bar.action'),
      {
        duration: 2000,
        panelClass: ['blue-snackbar'],
      }
    );
  }

  openSnackBar() {
    this._snackBar.open(
      this.translateService.instant('snack-bar.subscribe'),
      this.translateService.instant('snack-bar.action'),
      {
        duration: 2000,
      }
    );
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
      allowDispatch: [true, Validators.required],
    });
  }
}
