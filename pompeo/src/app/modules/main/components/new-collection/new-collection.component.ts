import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-new-collection',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.scss'],
})
export class NewCollectionComponent {}
