import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DynamicScriptLoaderService } from './../../../../service/dynamic-script-loader.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) map!: ElementRef;
  google: google.maps.Map | undefined;

  constructor(
    private readonly dynamicScriptLoaderService: DynamicScriptLoaderService
  ) {}

  ngAfterViewInit(): void {
    this.loadScripts();
  }

  initMap() {
    // The location of San Francisco
    const sanFrancisco = { lat: 37.78533131504486, lng: -122.40357624941201 };

    // The map, centered at San Francisco
    this.google = new google.maps.Map(this.map.nativeElement, {
      center: sanFrancisco,
      zoom: 18,
      mapId: '45e6069b743e9903',
    } as google.maps.MapOptions);
    // The marker, positioned at San Francisco
    const marker = new google.maps.Marker({
      position: sanFrancisco,
      map: this.google,
    });
  }

  private loadScripts() {
    this.dynamicScriptLoaderService
      .load('google')
      .then(() => {
        this.initMap();
      })
      .catch((error) => console.log(error));
  }
}
