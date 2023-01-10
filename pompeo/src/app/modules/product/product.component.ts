import { AfterContentChecked, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Language } from 'src/app/types/language.types';
import { TranslateService } from '@ngx-translate/core';
import { GetItemsService } from 'src/app/service/get-items.service';
import { SharedModule } from './../../shared/shared.module';
import { CartService } from 'src/app/service/cart.service';
import { IItems } from 'src/app/types/item.types';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatSnackBarModule,
    MatFormFieldModule,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [GetItemsService],
})
export default class ProductComponent implements AfterContentChecked, OnDestroy {
  id: string | null = null;
  item!: IItems;
  isButtonClicked: boolean = false;
  language: Language = this.translateService.currentLang as Language;
  languageSubscription = this.translateService.onLangChange.subscribe(() => {
    this.language = this.translateService.currentLang as Language;
  });

  constructor(
    private route: ActivatedRoute,
    private getItemsService: GetItemsService,
    private readonly translateService: TranslateService,
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) {
    this.language;
    this.languageSubscription;
    this.id = this.route.snapshot.paramMap.get('id');
    this.submit();
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.isItemInCart(this.id);
  }

  addToCart(item: IItems) {
    this.cartService.addToCart(item);
    this.openSnackBar();
  }

  isItemInCart(itemId: string | null) {
    this.cartService.list.forEach((elem) => {
      if (itemId === elem._id) {
        this.isButtonClicked = true;
      }
    });
  }

  submit() {
    if (this.id) {
      this.getItemsService.getItem({ id: this.id }).subscribe({
        next: (response) => {
          this.item = response;
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
        },
      });
    }
  }

  openSnackBar() {
    this._snackBar.open(
      this.translateService.instant('snack-bar.messeage'),
      this.translateService.instant('snack-bar.action'),
      {
        duration: 2000,
      }
    );
  }
}
