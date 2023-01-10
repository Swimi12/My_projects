import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IColection } from 'src/app/types/collection.types';
import { CollectionService } from './../../../../service/collection.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  providers: [CollectionService],
})
export class CollectionComponent {
  collectionList: IColection[] = [];

  constructor(private collectionService: CollectionService) {
    this.collectionList = this.collectionService.collectionList;
  }
}
