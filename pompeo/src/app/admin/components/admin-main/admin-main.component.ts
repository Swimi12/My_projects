import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { LogoComponent } from '../../../modules/components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { GetItemsService } from 'src/app/service/get-items.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IItems } from './../../../types/item.types';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss'],
  imports: [
    CommonModule,
    SharedModule,
    MatSnackBarModule,
    MatFormFieldModule,
    LogoComponent,
    RouterModule,
  ],
  providers: [GetItemsService],
})
export default class AdminMainComponent implements OnInit, OnDestroy {
  list: IItems[] = [];
  id!: string;
  sub!: Subscription;

  constructor(
    private getItemsService: GetItemsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.submit();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  submit() {
    this.getItemsService.getItems().subscribe({
      next: (response) => {
        response;
        this.list = response;
      },
      error: (errorResponse) => {
        console.log('errorResponse: ', errorResponse);
      },
    });
  }

  deleteItem(id: string) {
    if (id) {
      this.getItemsService.deleteItem(id).subscribe({
        next: (response) => {
          this.openSnackBar();
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
        },
      });
    }
  }

  openSnackBar() {
    this._snackBar.open("Item deleted", 'Close', {
      duration: 2000,
    });
  }
}
