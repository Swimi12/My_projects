import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AdditemService } from './additem.service';
import { InputTypes } from 'src/app/types/input.types';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-additems',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './additems.component.html',
  styleUrls: ['./additems.component.scss'],
  providers: [AdditemService],
})
export default class AdditemsComponent {
  form!: FormGroup;
  formFile!: FormGroup;
  InputTypes = InputTypes;
  loading: boolean = false;
  file: File | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly addItems: AdditemService,
    private readonly router: Router
  ) {
    this.initFormFile();
    this.initForm();
  }

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      const file = target.files![0];
      this.formFile.get('profile')!.setValue(file);
    }
  }

  submitFile() {
    const formData = new FormData();
    formData.append('file', this.formFile.get('profile')!.value);
    this.addItems.onSubmit(formData).subscribe({
      next: (response) => {
        this.form.get('nameFile')?.setValue(response.data.name);
        this.submit();
      },
      error: (errorResponse) => {
        console.log('errorResponse: ', errorResponse);
        this.form.enable();
      },
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.addItems.addItem(this.form.value).subscribe({
        next: (response) => {
          this.form.enable();
          this.loading = false;
          this.initForm();
          this.router.navigateByUrl('/admin');
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
          this.loading = false;
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

  private initFormFile() {
    this.formFile = this.fb.group({
      profile: [],
    });
  }

  private initForm() {
    this.form = this.fb.group({
      nameFile: [],
      nameUa: ['', Validators.required],
      nameEn: ['', Validators.required],
      price: ['', Validators.required],
      descriptionUa: ['', Validators.required],
      descriptionEn: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }
}
