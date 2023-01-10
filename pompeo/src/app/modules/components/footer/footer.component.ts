import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [LogoComponent, SharedModule],
})
export class FooterComponent {}
