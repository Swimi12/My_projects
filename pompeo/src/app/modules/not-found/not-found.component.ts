import { Component } from '@angular/core';
import { BaseRoutingModule } from './../base-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [BaseRoutingModule, SharedModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export default class NotFoundComponent {}
