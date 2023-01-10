import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTypes } from 'src/app/types/input.types';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IItems } from './../../../types/item.types';
import { GetItemsService } from 'src/app/service/get-items.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdditemService } from './../additems/additem.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatFormFieldModule,
  ],
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss'],
  providers: [GetItemsService, AdditemService],
})
export default class UpdateItemComponent {
  form!: FormGroup;
  formFile!: FormGroup;
  InputTypes = InputTypes;
  loading: boolean = false;
  id!: string | null;
  item!: IItems;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private route: ActivatedRoute,
    private getItemsService: GetItemsService,
    private additemService: AdditemService,
    private _snackBar: MatSnackBar
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getItem();
  }

  getItem() {
    if (this.id) {
      this.loading = true;
      this.getItemsService.getItem({ id: this.id }).subscribe({
        next: (response) => {
          this.item = response;
          this.loading = false;
          this.initFormFile();
          this.initForm();
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
        },
      });
    }
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
    if (this.formFile.get('profile')!.value === null) {
      formData.append('file', this.item.nameFile!);
    } else {
      formData.append('file', this.formFile.get('profile')!.value);
    }

    this.additemService.onSubmit(formData).subscribe({
      next: (response) => {
        this.form.get('nameFile')?.setValue(response.data.name);
        this.submit();
      },
      error: (errorResponse) => {
        console.log('errorResponse: ', errorResponse);
        this.submit();
      },
    });
  }

  submit() {
    console.log(1);
    this.form.markAllAsTouched();
    console.log('this.form: ', this.form);
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.getItemsService.updateItem(this.form.value).subscribe({
        next: (response) => {
          this.form.enable();
          this.initForm();
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

  private initFormFile() {
    this.formFile = this.fb.group({
      profile: [],
    });
  }

  private initForm() {
    this.form = this.fb.group({
      nameFile: [],
      id: this.id,
      nameUa: [this.item.name.ua, Validators.required],
      nameEn: [this.item.name.en, Validators.required],
      price: [this.item.price, Validators.required],
      descriptionUa: [this.item.description.ua, Validators.required],
      descriptionEn: [this.item.description.en, Validators.required],
      amount: [this.item.amount, Validators.required],
    });
  }
}
