import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputTypes } from 'src/app/types/input.types';
import { RegestrationService } from './registration.service';
import { Language } from 'src/app/types/language.types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [RegestrationService],
})
export class RegistrationComponent {
  @Output() onclick = new EventEmitter<void>();

  showPassword: boolean = false;
  regestrationStep: number = 0;
  InputTypes = InputTypes;
  form!: FormGroup;
  loading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly regestrationService: RegestrationService,
    private readonly router: Router,
    private readonly translateService: TranslateService
  ) {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      role: [1],
      firstName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  submit() {
    this.regestrationStep = 0;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.regestrationService
        .registration(
          this.form.value,
          this.translateService.currentLang as Language
        )
        .subscribe({
          next: (response) => {
            this.form.enable();
            this.initForm();
            this.router.navigateByUrl('');
          },
          error: (errorResponse) => {
            console.log('errorResponse: ', errorResponse);
            this.form.enable();
          },
        });
    }
  }

  isControlValid(controlName: string) {
    const control = this.form.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string) {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}
