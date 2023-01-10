import {
  Component,
  AfterContentInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterContentInit, OnDestroy {
  anchorNavigationSubsription$?: Subscription;
  @ViewChild('about', { static: false }) about!: ElementRef;
  @ViewChild('advantage', { static: false }) advantage!: ElementRef;
  @ViewChild('contact', { static: false }) contact!: ElementRef;

  constructor(private readonly navigationService: NavigationService) {}

  ngAfterContentInit(): void {
    this.anchorNavigationSubsription();
  }

  ngOnDestroy(): void {
    this.anchorNavigationSubsription$?.unsubscribe();
  }

  scrollToElement(block: HTMLElement): void {
    block.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  private anchorNavigationSubsription() {
    this.anchorNavigationSubsription$ =
      this.navigationService.anchorNavigationSubject.subscribe((route) => {
        this.scrollToElement(this[route].nativeElement);
      });
  }
}
